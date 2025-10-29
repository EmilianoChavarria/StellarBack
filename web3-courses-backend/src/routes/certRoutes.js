import express from "express";
import {
  createCertificate,
  getCertificates,
  getCertificateById,
} from "../controllers/certController.js";

const router = express.Router();

router.post("/", createCertificate);
router.get("/", getCertificates);
router.get("/:id", getCertificateById);

export default router;
