import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class RefundRequest extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public status!: string;
    public employeeId!: string;
  }

  RefundRequest.init(
    {
      RequestId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      EmployeeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      DateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ManagerComment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected", "Waiting"),
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      tableName: "requests",
    }
  );

  return Request;
};
