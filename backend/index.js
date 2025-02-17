const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { syncDB } = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  await connectDB();
  await syncDB();

  app.get("/", (req, res) => {
    res.json({ message: "Сервер работает!" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  });
};

startServer();

