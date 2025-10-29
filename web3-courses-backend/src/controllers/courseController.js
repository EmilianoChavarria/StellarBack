import Course from "../models/Course.js";
import User from "../models/User.js";

// Crear curso
export const createCourse = async (req, res) => {
  try {
    const { creatorId } = req.body;

    const creator = await User.findOne({ where: { id: creatorId, isActive: true } });
    if (!creator) {
      return res.status(400).json({
        message: `El usuario con id=${creatorId} no existe o está inactivo.`,
      });
    }

    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los cursos activos
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isActive: true },
      include: [{ model: User, as: "creator", attributes: ["id", "name", "email"] }],
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener curso por ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      where: { id: req.params.id, isActive: true },
      include: [{ model: User, as: "creator", attributes: ["id", "name", "email"] }],
    });
    if (!course) return res.status(404).json({ message: "Curso no encontrado o inactivo" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar curso con validación de usuario existente
export const updateCourse = async (req, res) => {
  try {
    const { creatorId } = req.body;

    // 🔹 Validar que el curso existe
    const course = await Course.findOne({ where: { id: req.params.id, isActive: true } });
    if (!course) return res.status(404).json({ message: "Curso no encontrado o inactivo" });

    // 🔹 Validar existencia del nuevo creador si se manda
    if (creatorId) {
      const creator = await User.findOne({ where: { id: creatorId, isActive: true } });
      if (!creator) {
        return res.status(400).json({
          message: `No se puede asignar el curso al usuario con id=${creatorId}. No existe o está inactivo.`,
        });
      }
    }

    await course.update(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrado lógico
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    await course.update({ isActive: false });
    res.json({ message: "Curso desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
