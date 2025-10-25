
import express from "express";
import {
  getUserDetails,
  getUserProblems,
  getUserSolutions
} from "../controllers/user.controller.js";

const router = express.Router();

// GET /users/:id - Get user details
router.get("/:id", getUserDetails)

// GET /users/:id/problems - Get all problems posted by a user
router.get("/:id/problems", getUserProblems);

// GET /users/:id/solutions - Get all solutions posted by a user
router.get("/:id/solutions", getUserSolutions);

export default router;