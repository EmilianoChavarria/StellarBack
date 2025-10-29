import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Role;
