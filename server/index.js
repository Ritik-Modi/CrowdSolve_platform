import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.route.js";
import solutionRoutes from "./routes/solution.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ FIXED: Clean CORS (no manual OPTIONS needed)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/users", userRoutes);

// ✅ Debug middleware to see if request hits Express
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Routes

// ✅ Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Event Management API",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
