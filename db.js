const { Sequelize, DataTypes } = require("sequelize");

const DB_URL =
  process.env.DATABASE_URL || "postgres://localhost:5432/ttp";

const db = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectOptions: process.env.DATABASE_URL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

// models
const UserModel = db.define("user", {
  name: DataTypes.STRING,
});

module.exports = {
  db,
  UserModel,
};