// models/Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    units: { type: Number, required: true, default: 1 },
    emergency: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
