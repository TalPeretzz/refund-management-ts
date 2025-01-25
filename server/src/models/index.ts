import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import User from "./User";
import Request from "./Request";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT as any,
  pool: dbConfig.pool,
});

const db = {
  sequelize,
  Sequelize,
  User: User(sequelize),
  Request: Request(sequelize),
};

// Define relationships
db.User.hasMany(db.Request, { foreignKey: "employeeId" });
db.Request.belongsTo(db.User, { foreignKey: "employeeId" });

export default db;
