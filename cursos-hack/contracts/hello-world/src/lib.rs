#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, contracterror, Address, Env, String, Vec, symbol_short, vec};

#[contract]
pub struct CoursePlatform;

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Course {
    pub id: String,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub price: i128,
    pub created_at: u64,
    pub is_active: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Enrollment {
    pub student: Address,
    pub course_id: String,
    pub enrolled_at: u64,
    pub completed: bool,
    pub certificate_issued: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Certificate {
    pub student: Address,
    pub course_id: String,
    pub issued_at: u64,
    pub nft_id: String,
    pub is_active: bool,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    CourseNotFound = 1,
    CourseExists = 2,
    AlreadyEnrolled = 3,
    NotEnrolled = 4,
    CourseNotActive = 5,
    AlreadyCompleted = 6,
    Unauthorized = 7,
}

#[contractimpl]
impl CoursePlatform {
    
    // ========== INITIALIZATION ==========
    pub fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        env.storage().instance().set(&symbol_short!("admin"), &admin);
    }
    
    // ========== COURSE MANAGEMENT ==========
    
    pub fn create_course(
        env: Env,
        creator: Address,
        course_id: String,
        title: String,
        description: String,
        price: i128
    ) -> Result<(), Error> {
        creator.require_auth();
        
        // Verificar que el curso no exista
        let course_key = (symbol_short!("course"), course_id.clone());
        if env.storage().persistent().has(&course_key) {
            return Err(Error::CourseExists);
        }
        
        let course = Course {
            id: course_id.clone(),
            creator: creator.clone(),
            title,
            description,
            price,
            created_at: env.ledger().timestamp(),
            is_active: true,
        };
        
        // Guardar el curso
        env.storage().persistent().set(&course_key, &course);
        
        // Agregar a la lista de cursos del creador
        let creator_courses_key = (symbol_short!("crs_crt"), creator.clone());
        let mut creator_courses: Vec<String> = env.storage().persistent()
            .get(&creator_courses_key)
            .unwrap_or_else(|| vec![&env]);
        
        creator_courses.push_back(course_id.clone());
        env.storage().persistent().set(&creator_courses_key, &creator_courses);
        
        // Emitir evento
        let topics = (symbol_short!("crs_crted"), creator, course_id);
        env.events().publish(topics, price);
        
        Ok(())
    }
    
    pub fn get_course(env: Env, course_id: String) -> Option<Course> {
        let course_key = (symbol_short!("course"), course_id);
        env.storage().persistent().get(&course_key)
    }
    
    pub fn update_course_status(
        env: Env, 
        creator: Address, 
        course_id: String, 
        is_active: bool
    ) -> Result<(), Error> {
        creator.require_auth();
        
        let course_key = (symbol_short!("course"), course_id.clone());
        let mut course: Course = env.storage().persistent().get(&course_key)
            .ok_or(Error::CourseNotFound)?;
        
        if course.creator != creator {
            return Err(Error::Unauthorized);
        }
        
        course.is_active = is_active;
        env.storage().persistent().set(&course_key, &course);
        
        Ok(())
    }
    
    // ========== ENROLLMENT & PAYMENTS ==========
    
    pub fn enroll_course(env: Env, student: Address, course_id: String) -> Result<(), Error> {
        student.require_auth();
        
        let course_key = (symbol_short!("course"), course_id.clone());
        let course: Course = env.storage().persistent().get(&course_key)
            .ok_or(Error::CourseNotFound)?;
        
        if !course.is_active {
            return Err(Error::CourseNotActive);
        }
        
        // Verificar que el estudiante no esté ya inscrito
        let enrollment_key = (symbol_short!("enroll"), student.clone(), course_id.clone());
        if env.storage().persistent().has(&enrollment_key) {
            return Err(Error::AlreadyEnrolled);
        }
        
        // Crear inscripción
        let enrollment = Enrollment {
            student: student.clone(),
            course_id: course_id.clone(),
            enrolled_at: env.ledger().timestamp(),
            completed: false,
            certificate_issued: false,
        };
        
        // Guardar inscripción
        env.storage().persistent().set(&enrollment_key, &enrollment);
        
        // Agregar a la lista de cursos del estudiante
        let student_courses_key = (symbol_short!("crs_std"), student.clone());
        let mut student_courses: Vec<String> = env.storage().persistent()
            .get(&student_courses_key)
            .unwrap_or_else(|| vec![&env]);
        
        student_courses.push_back(course_id.clone());
        env.storage().persistent().set(&student_courses_key, &student_courses);
        
        // Emitir evento
        let topics = (symbol_short!("enrolled"), student, course_id);
        env.events().publish(topics, course.price);
        
        Ok(())
    }
    
    pub fn is_enrolled(env: Env, student: Address, course_id: String) -> bool {
        let enrollment_key = (symbol_short!("enroll"), student, course_id);
        env.storage().persistent().has(&enrollment_key)
    }
    
    // ========== CERTIFICATES ==========
    
    pub fn complete_course(
        env: Env, 
        student: Address, 
        course_id: String
    ) -> Result<(), Error> {
        student.require_auth();
        
        // Verificar inscripción
        let enrollment_key = (symbol_short!("enroll"), student.clone(), course_id.clone());
        let mut enrollment: Enrollment = env.storage().persistent().get(&enrollment_key)
            .ok_or(Error::NotEnrolled)?;
        
        if enrollment.completed {
            return Err(Error::AlreadyCompleted);
        }
        
        // Marcar como completado
        enrollment.completed = true;
        enrollment.certificate_issued = true;
        env.storage().persistent().set(&enrollment_key, &enrollment);
        
        // Crear certificado con ID simple - usar solo el course_id como NFT ID
        let nft_id = course_id.clone();
        
        let certificate = Certificate {
            student: student.clone(),
            course_id: course_id.clone(),
            issued_at: env.ledger().timestamp(),
            nft_id,
            is_active: true,
        };
        
        // Guardar certificado
        let certificate_key = (symbol_short!("cert"), student.clone(), course_id.clone());
        env.storage().persistent().set(&certificate_key, &certificate);
        
        // Emitir evento
        let topics = (symbol_short!("cert"), student, course_id);
        env.events().publish(topics, true);
        
        Ok(())
    }
    
    pub fn verify_certificate(
        env: Env, 
        student: Address, 
        course_id: String
    ) -> bool {
        let certificate_key = (symbol_short!("cert"), student, course_id);
        env.storage().persistent().has(&certificate_key)
    }
    
    pub fn get_certificate(
        env: Env, 
        student: Address, 
        course_id: String
    ) -> Option<Certificate> {
        let certificate_key = (symbol_short!("cert"), student, course_id);
        env.storage().persistent().get(&certificate_key)
    }
    
    // ========== QUERY FUNCTIONS ==========
    
    pub fn get_creator_courses(env: Env, creator: Address) -> Vec<String> {
        let creator_courses_key = (symbol_short!("crs_crt"), creator);
        env.storage().persistent()
            .get(&creator_courses_key)
            .unwrap_or_else(|| vec![&env])
    }
    
    pub fn get_student_courses(env: Env, student: Address) -> Vec<String> {
        let student_courses_key = (symbol_short!("crs_std"), student);
        env.storage().persistent()
            .get(&student_courses_key)
            .unwrap_or_else(|| vec![&env])
    }
    
    pub fn get_enrollment(
        env: Env, 
        student: Address, 
        course_id: String
    ) -> Option<Enrollment> {
        let enrollment_key = (symbol_short!("enroll"), student, course_id);
        env.storage().persistent().get(&enrollment_key)
    }
}