const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { syncDB } = require("./models");
const setupSwagger = require('./swagger');
const morgan = require('morgan');
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  next();
};

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url'));
app.use("", eventRoutes);
app.use("", userRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "неправильный путь" });
});

// app.use("/events", apiKeyMiddleware);
// app.use("/users", apiKeyMiddleware);

setupSwagger(app);



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

