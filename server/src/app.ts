import express from "express";
import dotenv from "dotenv";
import db from "./models";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return db.sequelize.sync(); // Sync models with the database
  })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Database connection failed:", err));

// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
