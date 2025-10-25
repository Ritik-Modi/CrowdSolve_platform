import Problem from "../models/Problem.model.js";
import Solution from "../models/Solution.model.js";
import User from "../models/User.model.js";

// GET /users/:id - Get user details
export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally get counts of user's problems and solutions
    const problemCount = await Problem.countDocuments({ postedBy: id });
    const solutionCount = await Solution.countDocuments({ postedBy: id });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      stats: {
        problemsPosted: problemCount,
        solutionsPosted: solutionCount
      }
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /users/:id/problems - Get all problems posted by a user
export const getUserProblems = async (req, res) => {
  try {
    const { id } = req.params;

    const problems = await Problem.find({ postedBy: id })
      .populate("postedBy", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      problems,
      count: problems.length
    });
  } catch (error) {
    console.error("Error fetching user problems:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /users/:id/solutions - Get all solutions posted by a user
export const getUserSolutions = async (req, res) => {
  try {
    const { id } = req.params;

    const solutions = await Solution.find({ postedBy: id })
      .populate("postedBy", "name email avatar")
      .populate("problemId", "title description")
      .populate("comments.userId", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      solutions,
      count: solutions.length
    });
  } catch (error) {
    console.error("Error fetching user solutions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};