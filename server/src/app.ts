import express from "express";
import dotenv from "dotenv";
import db from "./models";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Test database connection and sync
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Add routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
