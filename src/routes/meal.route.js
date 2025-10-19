import { Router } from "express";
import { addMeal, getAllMeals, getMealParticipants, getNumberofRecords } from "../controllers/meal.controller.js";


const router = Router();

router.get("/getMeals/:index",getAllMeals);
router.post("/add",addMeal);
router.get("/:meal_id/participants",getMealParticipants);
router.get("/numberOfRecords",getNumberofRecords);


export default router;