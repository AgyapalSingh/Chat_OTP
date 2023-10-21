import express from "express";
import {
  signup,
  verifyOtp,
} from "../controllers/authController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);

export default router;
