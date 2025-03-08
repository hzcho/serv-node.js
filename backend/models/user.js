<<<<<<< HEAD
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcryptjs");
=======
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
>>>>>>> feature/LAB1-1

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

<<<<<<< HEAD
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
=======
export  default User;
>>>>>>> feature/LAB1-1

module.exports = User;
