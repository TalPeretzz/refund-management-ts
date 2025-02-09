import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class RefundRequest extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public amount!: number;
    public attachment!: string | null;
    public employeeId!: string;
    public status!: "Pending" | "Approved" | "Rejected";
  }

  RefundRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      attachment: {
        type: DataTypes.STRING, // ✅ Store only the file path (not Base64 or object)
        allowNull: true,
      },
      employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending",
      },
    },
    {
      sequelize,
      tableName: "RefundRequests",
    }
  );

  return RefundRequest;
};
