import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize: Sequelize) => {
  class User extends Model {
    public UserId!: string;
    public FullName!: string;
    public Email!: string;
    public Username!: string;
    public Password!: string;
    public Role!: string;
    public IsActive!: boolean;

    public static async hashPassword(password: string): Promise<string> {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    }
  }

  User.init(
    {
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.ENUM("employee", "manager", "account-manager", "admin"),
        defaultValue: "employee",
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "Users",
      hooks: {
        beforeCreate: async (user) => {
          user.Password = await User.hashPassword(user.Password);
        },
      },
    }
  );

  return User;
};
