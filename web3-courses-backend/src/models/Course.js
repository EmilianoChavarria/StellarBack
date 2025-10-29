import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Course = sequelize.define("Course", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  blockchainTokenId: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

User.hasMany(Course, { foreignKey: "creatorId" });
Course.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

export default Course;
