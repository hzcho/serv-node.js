<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: './backend/.env' });
const { connectDB } = require("./config/db");
const { syncDB } = require("./models");
const setupSwagger = require('./swagger');
const morgan = require('morgan');
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const publicRoutes = require("./routes/publicRoutes");
=======
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { syncDB } from "./models/index.js";
import setupSwagger from "./swagger.js";
import morgan from "morgan";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import apiKeyMiddleware from "./middlewares/apiKeyMiddleware.js";
>>>>>>> feature/LAB1-1


const app = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(morgan(':method :url'));
app.use("", eventRoutes);
app.use("", userRoutes);
app.use("/auth", authRoutes);
app.use("", publicRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "неправильный путь" });
});
=======
app.use(morgan(":method :url"));
>>>>>>> feature/LAB1-1

app.use("/events", apiKeyMiddleware, eventRoutes);
app.use("/users", apiKeyMiddleware, userRoutes);

app.use(errorMiddleware);

setupSwagger(app);

app.use((req, res, next) => {
  res.status(404).json({ message: "Неправильный путь" });
});

const startServer = async () => {
  try {
    await connectDB();
    await syncDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервера:", error);
  }
};

startServer();