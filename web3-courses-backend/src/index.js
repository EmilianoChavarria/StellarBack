import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import certRoutes from "./routes/certRoutes.js";
import Role from "./models/Role.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/certs", certRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión MySQL exitosa");
        await sequelize.sync({ alter: true });
        const defaultRoles = [
            { name: "user", description: "Usuario estándar" },
            { name: "owner", description: "Propietario / administrador de cursos" },
        ];

        for (const role of defaultRoles) {
            const [foundRole, created] = await Role.findOrCreate({
                where: { name: role.name },
                defaults: role,
            });
            if (created) {
                console.log(`🆕 Rol '${role.name}' creado`);
            }
        }
    } catch (err) {
        console.error("❌ Error conectando MySQL:", err);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
