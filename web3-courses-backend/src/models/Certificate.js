import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Course from "./Course.js";

const Certificate = sequelize.define("Certificate", {
  nftId: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

User.hasMany(Certificate, { foreignKey: "studentId" });
Certificate.belongsTo(User, { as: "student", foreignKey: "studentId" });

Course.hasMany(Certificate, { foreignKey: "courseId" });
Certificate.belongsTo(Course, { foreignKey: "courseId" });

export default Certificate;
