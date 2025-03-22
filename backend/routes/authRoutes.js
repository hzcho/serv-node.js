import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/refresh", AuthController.refreshToken);

export default router;