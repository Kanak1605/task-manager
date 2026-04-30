import express from "express";
import { createTask, getTasks, updateTask } from "../controller/taskController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.patch("/:id", auth, updateTask);

// ✅ THIS LINE IS IMPORTANT
export default router;