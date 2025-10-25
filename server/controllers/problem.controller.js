import Problem from "../models/Problem.model.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// Get all problems with pagination & filters
export const getAllProblems = async (req, res) => {
  try {
    const { page = 1, limit = 10, location, search } = req.query;

    // Build query
    const query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const problems = await Problem.find(query)
      .populate("postedBy", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalProblems = await Problem.countDocuments(query);
    const totalPages = Math.ceil(totalProblems / parseInt(limit));

    res.status(200).json({
      problems,
      totalPages,
      currentPage: parseInt(page),
      totalProblems,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single problem by ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate(
      "postedBy",
      "name email avatar"
    );

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new problem
export const createProblem = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({ 
        message: "Title and description are required" 
      });
    }

    let imageUrl = null;

    // Upload image if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newProblem = new Problem({
      title,
      description,
      image: imageUrl,
      location,
      postedBy: userId,
    });

    await newProblem.save();
    await newProblem.populate("postedBy", "name email avatar");

    res.status(201).json({
      message: "Problem posted successfully",
      problem: newProblem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log(error)
  }
};

export const updateProblem = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const userId = req.user.id;

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (problem.postedBy.toString() !== userId) {
      return res.status(403).json({ 
        message: "You can only update your own problems" 
      });
    }

    // Update text fields
    if (title) problem.title = title;
    if (description) problem.description = description;
    if (location) problem.location = location;

    // Update image if new one is uploaded
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      problem.image = result.secure_url;
    }

    await problem.save();
    await problem.populate("postedBy", "name email avatar");

    res.status(200).json({
      message: "Problem updated successfully",
      problem,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Delete problem
export const deleteProblem = async (req, res) => {
  try {
    const userId = req.user.id;

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    if (problem.postedBy.toString() !== userId) {
      return res.status(403).json({ 
        message: "You can only delete your own problems" 
      });
    }

    await Problem.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};