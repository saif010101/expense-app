import { Router } from "express";
import authLogin from "../middlewares/authLogin.js";
import { getUsername, logoutUser, showDashboard } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/",authLogin,showDashboard);
router.get("/username",getUsername);
router.get("/logout",logoutUser);
export default router;