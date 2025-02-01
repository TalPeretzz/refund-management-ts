import express from "express";
import UserController from "../controllers/UserController";
import UserService from "../services/UserService";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get("/login", (req, res) => userController.getAllUsers(req, res));
router.post("/profile", (req, res) => userController.createUser(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));

export default router;
