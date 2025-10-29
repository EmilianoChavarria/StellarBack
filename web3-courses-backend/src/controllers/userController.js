import User from "../models/User.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios activos
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { isActive: true } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener usuario por ID (solo activos)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, isActive: true } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado o inactivo" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, isActive: true } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado o inactivo" });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrado lógico
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ isActive: false });
    res.json({ message: "Usuario desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
