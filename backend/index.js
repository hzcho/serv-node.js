import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { syncDB } from "./models/index.js";
import setupSwagger from "./swagger.js";
import morgan from "morgan";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import passportMiddleware from "./middlewares/passportMiddleware.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan(":method :url"));
app.use(passportMiddleware.initialize());

app.use("/events", publicRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

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