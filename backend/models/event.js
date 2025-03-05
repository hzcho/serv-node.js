import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./user.js";

const Event = sequelize.define("event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Локация не может быть пустой",
      },
    },
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Event, { foreignKey: "createdBy", onDelete: "CASCADE" });
Event.belongsTo(User, { foreignKey: "createdBy" });

export default Event;
