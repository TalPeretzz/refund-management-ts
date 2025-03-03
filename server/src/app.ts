import express from "express";
import dotenv from "dotenv";
import db from "./models";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import refundRoutes from "./routes/refundRequest.routes";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

/**
 * Ensures that an admin user exists. If not, it creates one.
 */
async function ensureAdminExists() {
  try {
    const adminUser = await db.User.findOne({ where: { Role: "admin" } });

    if (!adminUser) {
      console.log("No admin user found. Creating default admin user...");

      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        10
      );

      await db.User.create({
        FullName: "Admin User",
        Email: process.env.ADMIN_EMAIL || "admin@example.com",
        Username: "admin",
        Password: hashedPassword,
        Role: "admin",
        IsActive: true,
      });

      console.log("✅ Admin user created successfully.");
    } else {
      console.log("✅ Admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error ensuring admin user exists:", error);
  }
}

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
    return db.sequelize.sync({ alter: true });
  })
  .then(async () => {
    console.log("Database synced!");
    await ensureAdminExists();
  })
  .catch((err) => console.error("Database connection failed:", err));

// Add routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", refundRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
