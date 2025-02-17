import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";
import User from "./User";
import RefundRequest from "./RefundRequest";
import EmployeeManager from "./EmployeeManager";

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
  EmployeeManager: EmployeeManager(sequelize),
};

db.User.hasOne(db.EmployeeManager, {
  foreignKey: "employeeId",
  as: "EmployeeManager",
});

db.EmployeeManager.belongsTo(db.User, {
  foreignKey: "managerId",
  as: "ManagerUser",
});

export default db;
