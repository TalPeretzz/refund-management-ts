import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize: Sequelize) => {
  class User extends Model {
    public id!: string;
    public username!: string;
    public password!: string;
    public role!: string;

    public static async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      managerId:{
        type: DataTypes.UUID,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("employee", "manager", "account-manager"),
        defaultValue: "employee",
      },
    },
    {
      sequelize,
      tableName: "users",
      hooks: {
        beforeCreate: async (user) => {
          user.password = await User.hashPassword(user.password);
        },
      },
    }
  );

  return User;
};
