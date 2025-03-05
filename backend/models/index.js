import { sequelize } from "../config/db.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ База данных синхронизирована");
  } catch (error) {
    console.error("❌ Ошибка синхронизации:", error);
  }
};

export { syncDB };

