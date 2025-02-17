import { DataTypes, Model, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize: Sequelize) => {
  class UserManager extends Model {
    public UserId!: string;
    public ManagerId!: string;
  }

  UserManager.init(
    {
      UserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ManagerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "UserManager",
    }
  );

  return UserManager;
};
