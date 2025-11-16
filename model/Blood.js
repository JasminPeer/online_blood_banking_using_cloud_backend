import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema(
  {
    bloodGroup: { type: String, required: true, unique: true },
    units: { type: Number, default: 0 },
    expiryDays: { type: Number, default: 30 }
  },
  { timestamps: true }
);

export default mongoose.model("Blood", bloodSchema);
