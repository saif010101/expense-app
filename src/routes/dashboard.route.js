import { Router } from "express";
import authLogin from "../middlewares/authLogin.js";
import { getUsername, showDashboard } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/",authLogin,showDashboard);
router.get("/username",getUsername);
export default router;