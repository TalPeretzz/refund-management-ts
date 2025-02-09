import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class EmployeeManager extends Model {
    public id!: string;
    public employeeId!: string;
    public managerId!: string;
  }

  EmployeeManager.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // Foreign Key to Users table
          key: "UserId",
        },
        onDelete: "CASCADE",
      },
      managerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // Foreign Key to Users table
          key: "UserId",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "EmployeeManager",
    }
  );

  return EmployeeManager;
};
