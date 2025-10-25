import express from "express";
import {
  createSolution,
  upvoteSolution,
  addComment,
  updateSolution,
  deleteSolution
} from "../controllers/solution.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /solutions - Create a new solution (Protected)
router.post("/", verifyToken, createSolution);

// PUT /solutions/:id/upvote - Toggle upvote on solution (Protected)
router.put("/:id/upvote", verifyToken, upvoteSolution);

// POST /solutions/:id/comment - Add comment to solution (Protected)
router.post("/:id/comment", verifyToken, addComment);

// PUT /solutions/:id - Update solution (Protected - owner only)
router.put("/:id", verifyToken, updateSolution);

// DELETE /solutions/:id - Delete solution (Protected - owner only)
router.delete("/:id", verifyToken, deleteSolution);

export default router;