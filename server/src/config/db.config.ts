import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "refund_admin",
  PASSWORD: process.env.DB_PASSWORD || "refund_password",
  DB: process.env.DB_NAME || "refund_management",
  DIALECT: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
