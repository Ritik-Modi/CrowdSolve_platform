import express from "express";
import { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem } from "../controllers/problem.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET /api/problems - Get all problems
router.get("/", getAllProblems);

// GET /api/problems/:id - Get single problem
router.get("/:id", getProblemById);

// POST /api/problems - Create problem (Protected + File Upload)
router.post("/", verifyToken, upload.single("image"), createProblem);

// PUT /api/problems/:id - Update problem (Protected)
router.put("/:id", verifyToken, upload.single("image"), updateProblem);


// DELETE /api/problems/:id - Delete problem (Protected)
router.delete("/:id", verifyToken, deleteProblem);

export default router;