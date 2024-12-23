import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "userAuth",
  {
    username: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    password: { type: DataTypes.STRING, allowNull: true, unique: true },
  },
  { timestamps: true }
);

export default User;
