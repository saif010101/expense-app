import { Router } from "express";
import { clearKhata, getAllStudents, getFirstName, getKhata, validateLogin} from "../controllers/student.controller.js";

const router = Router();

// khata = account record like how much he has to pay and how much to receive
router.get("/",getAllStudents);
router.get("/:username/fname",getFirstName);
router.get("/:username/khata",getKhata);
router.delete("/:firstStudent/:secondStudent/clearKhata",clearKhata);
router.post("/login",validateLogin);

export default router;