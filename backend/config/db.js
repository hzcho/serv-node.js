<<<<<<< HEAD
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: './backend/.env' });;
=======
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
>>>>>>> feature/LAB1-1

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Успешное подключение к базе данных");
  } catch (error) {
    console.error("❌ Ошибка подключения к БД:", error);
    process.exit(1);
  }
};

export { connectDB, sequelize };
