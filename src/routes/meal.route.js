import { Router } from "express";
import { addMeal, getAllMeals, getMealParticipants } from "../controllers/meal.controller.js";


const router = Router();

router.get("/",getAllMeals);
router.post("/add",addMeal);
router.get("/:meal_id/participants",getMealParticipants)


export default router;