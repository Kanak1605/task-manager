import express from "express";
import { createProject, getProjects, addMember } from "../controller/projectController.js";
import { auth, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// ✅ ADD THIS LINE
router.post("/", auth, createProject);

router.get("/", auth, getProjects);
router.post("/:id/add-member", auth, isAdmin, addMember);

export default router;