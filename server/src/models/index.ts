import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import User from "./User";
import RefundRequest from "./RefundRequest";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT as any,
  pool: dbConfig.pool,
  logging: false,
});

const db = {
  sequelize,
  Sequelize,
  User: User(sequelize),
  RefundRequest: RefundRequest(sequelize),
};

export default db;
