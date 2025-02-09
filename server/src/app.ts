import express from "express";
import dotenv from "dotenv";
import db from "./models";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import refundRoutes from "./routes/refundRequest.routes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return db.sequelize.sync({ alter: true }); // Sync models with the database
  })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Database connection failed:", err));

// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", refundRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
