import Solution from "../models/Solution.model.js";
import Problem from "../models/Problem.model.js";
import mongoose from "mongoose";
// POST /solutions - Create a new solution
export const createSolution = async (req, res) => {
  try {
    const { problemId, content } = req.body;

    // Validate required fields
    if (!problemId || !content) {
      return res.status(400).json({ message: "Problem ID and content are required" });
    }

    // Check if problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Create new solution
    const solution = new Solution({
      problemId,
      content,
      postedBy: req.user.id, // From auth middleware
      upvotes: [],
      comments: []
    });

    await solution.save();

    res.status(201).json({
      message: "Solution posted successfully",
      solution
    });
  } catch (error) {
    console.error("Error creating solution:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /solutions/:id/upvote - Toggle upvote on solution
export const upvoteSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const solution = await Solution.findById(id);
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    // Check if user already upvoted
    const upvoteIndex = solution.upvotes.indexOf(userId);
    
    if (upvoteIndex > -1) {
      // Remove upvote
      solution.upvotes.splice(upvoteIndex, 1);
      await solution.save();
      
      return res.status(200).json({
        message: "Upvote removed successfully",
        upvotes: solution.upvotes,
        upvoteCount: solution.upvotes.length
      });
    } else {
      // Add upvote
      solution.upvotes.push(userId);
      await solution.save();
      
      return res.status(200).json({
        message: "Solution upvoted successfully",
        upvotes: solution.upvotes,
        upvoteCount: solution.upvotes.length
      });
    }
  } catch (error) {
    console.error("Error upvoting solution:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /solutions/:id/comment - Add comment to solution
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const solution = await Solution.findById(id);
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    const comment = {
      _id: new mongoose.Types.ObjectId(),
      userId,
      text,
      createdAt: new Date()
    };

    solution.comments.push(comment);
    await solution.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /solutions/:id - Update solution (owner only)
export const updateSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const solution = await Solution.findById(id);
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    // Check if user is the owner
    if (solution.postedBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this solution" });
    }

    solution.content = content;
    await solution.save();

    res.status(200).json({
      message: "Solution updated successfully",
      solution
    });
  } catch (error) {
    console.error("Error updating solution:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /solutions/:id - Delete solution (owner only)
export const deleteSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const solution = await Solution.findById(id);
    if (!solution) {
      return res.status(404).json({ message: "Solution not found" });
    }

    // Check if user is the owner
    if (solution.postedBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this solution" });
    }

    await Solution.findByIdAndDelete(id);

    res.status(200).json({
      message: "Solution deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting solution:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};