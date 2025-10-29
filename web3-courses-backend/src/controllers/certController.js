import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

// Crear certificado (NFT simulado)
export const createCertificate = async (req, res) => {
  try {
    const { studentId, courseId, nftId } = req.body;
    const cert = await Certificate.create({ studentId, courseId, nftId });
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los certificados
export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.findAll({
      include: [
        { model: User, as: "student", attributes: ["id", "name", "email"] },
        { model: Course, attributes: ["id", "title", "price"] },
      ],
    });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener certificado por ID
export const getCertificateById = async (req, res) => {
  try {
    const cert = await Certificate.findByPk(req.params.id, {
      include: [
        { model: User, as: "student", attributes: ["id", "name", "email"] },
        { model: Course, attributes: ["id", "title"] },
      ],
    });
    if (!cert) return res.status(404).json({ message: "Certificado no encontrado" });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
