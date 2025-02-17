import { DataTypes, Model, Sequelize } from "sequelize";
import RefundRequestModel from "./RefundRequest"; // Import the RefundRequest model

export default (sequelize: Sequelize) => {
  class Notification extends Model {
    public id!: string;
    public requestId!: string;
    public message!: string;
    public status!: "Pending" | "Sent" | "Failed";
    public createDate!: Date;
  }

  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      requestId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: RefundRequestModel(sequelize), // References the RefundRequest table
          key: "id",
        },
        onDelete: "CASCADE", // If a request is deleted, delete notifications
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Sent", "Failed"),
        defaultValue: "Pending",
      },
      createDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "Notifications",
    }
  );

  return Notification;
};
