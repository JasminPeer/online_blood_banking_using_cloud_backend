import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import donorRoutes from "./routes/DonorRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";   // ✅ ADD THIS

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/donors", donorRoutes);
app.use("/api/blood", bloodRoutes);
app.use("/api/patients", patientRoutes);   // ✅ ADD THIS

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
