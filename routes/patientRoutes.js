// routes/patientRoutes.js
import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// GET all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching patients",
      error: err.message,
    });
  }
});

// ADD a new patient
router.post("/", async (req, res) => {
  try {
    const { name, age, bloodGroup, units, emergency } = req.body;

    if (!name || !bloodGroup || !units) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const patient = await Patient.create({
      name,
      age,
      bloodGroup,
      units,
      emergency,
    });

    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({
      message: "Error adding patient",
      error: err.message,
    });
  }
});

// DELETE patient by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting patient",
      error: err.message,
    });
  }
});

export default router;
