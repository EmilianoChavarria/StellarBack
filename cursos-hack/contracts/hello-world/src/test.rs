#![cfg(test)]
use super::*;
use soroban_sdk::{symbol_short, vec, Env, String, Address};

#[test]
fn test_create_course() {
    let env = Env::default();
    let contract_id = env.register(CoursePlatform, ());
    let client = CoursePlatformClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    
    // Inicializar contrato
    client.initialize(&admin);
    
    // Crear curso
    let result = client.create_course(
        &creator,
        &String::from_str(&env, "course_1"),
        &String::from_str(&env, "Blockchain Basics"),
        &String::from_str(&env, "Learn blockchain fundamentals"),
        &10000000,
    );
    
    assert!(result.is_ok());
    
    // Verificar que el curso se creó
    let course = client.get_course(&String::from_str(&env, "course_1"));
    assert!(course.is_some());
    assert_eq!(course.unwrap().title, String::from_str(&env, "Blockchain Basics"));
}

#[test]
fn test_enroll_course() {
    let env = Env::default();
    let contract_id = env.register(CoursePlatform, ());
    let client = CoursePlatformClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let student = Address::generate(&env);
    
    client.initialize(&admin);
    
    // Crear curso
    client.create_course(
        &creator,
        &String::from_str(&env, "course_1"),
        &String::from_str(&env, "Test Course"),
        &String::from_str(&env, "Test Description"),
        &5000000,
    ).unwrap();
    
    // Inscribir estudiante
    let result = client.enroll_course(&student, &String::from_str(&env, "course_1"));
    assert!(result.is_ok());
    
    // Verificar inscripción
    let is_enrolled = client.is_enrolled(&student, &String::from_str(&env, "course_1"));
    assert!(is_enrolled);
}

#[test]
fn test_complete_course() {
    let env = Env::default();
    let contract_id = env.register(CoursePlatform, ());
    let client = CoursePlatformClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let creator = Address::generate(&env);
    let student = Address::generate(&env);
    
    client.initialize(&admin);
    
    client.create_course(
        &creator,
        &String::from_str(&env, "course_1"),
        &String::from_str(&env, "Test Course"),
        &String::from_str(&env, "Test Description"),
        &10000000,
    ).unwrap();
    
    client.enroll_course(&student, &String::from_str(&env, "course_1")).unwrap();
    
    // Completar curso
    let result = client.complete_course(&student, &String::from_str(&env, "course_1"));
    assert!(result.is_ok());
    
    // Verificar certificado
    let is_verified = client.verify_certificate(&student, &String::from_str(&env, "course_1"));
    assert!(is_verified);
    
    // Verificar información del certificado
    let certificate = client.get_certificate(&student, &String::from_str(&env, "course_1"));
    assert!(certificate.is_some());
    let cert = certificate.unwrap();
    assert_eq!(cert.course_id, String::from_str(&env, "course_1"));
    assert!(cert.is_active);
}