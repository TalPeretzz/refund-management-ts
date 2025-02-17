import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import EmployeeManagerModel from "./EmployeeManager";

export class User extends Model {
  public UserId!: string;
  public FullName!: string;
  public Email!: string;
  public Username!: string;
  public Password!: string;
  public Role!: "employee" | "manager" | "account-manager" | "admin";
  public IsActive!: boolean;

  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

export default function initializeUserModel(sequelize: Sequelize) {
  User.init(
    {
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      FullName: { type: DataTypes.STRING, allowNull: false },
      Email: { type: DataTypes.STRING, allowNull: false, unique: true },
      Username: { type: DataTypes.STRING, allowNull: false, unique: true },
      Password: { type: DataTypes.STRING, allowNull: false },
      Role: {
        type: DataTypes.ENUM("employee", "manager", "account-manager", "admin"),
        defaultValue: "employee",
      },
      IsActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      tableName: "Users",
      hooks: {
        beforeCreate: async (user) => {
          user.Password = await User.hashPassword(user.Password);
        },
        beforeUpdate: async (user) => {
          if (user.changed("Password")) {
            console.log("Hashing password before updating...");
            user.Password = await User.hashPassword(user.Password);
          }
        },
      },
    }
  );

  const EmployeeManager = EmployeeManagerModel(sequelize);
  User.hasMany(EmployeeManager, { foreignKey: "managerId", as: "Employees" }); // A manager has many employees
  User.hasOne(EmployeeManager, { foreignKey: "employeeId", as: "Manager" }); // An employee has one manager

  return User;
}
