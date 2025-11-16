import express from "express";
import Blood from "../model/Blood.js";

const router = express.Router();

// Get full blood stock
router.get("/", async (req, res) => {
  try {
    const stock = await Blood.find().sort({ bloodGroup: 1 });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stock" });
  }
});

// Hospital request blood
router.post("/request", async (req, res) => {
  try {
    const { bloodGroup, unitsNeeded } = req.body;
    let stock = await Blood.findOne({ bloodGroup });

    if (!stock || stock.units < unitsNeeded) {
      return res.status(400).json({ message: "Not enough units available" });
    }

    stock.units -= unitsNeeded;

    if (stock.units === 0) {
      await Blood.deleteOne({ bloodGroup });
    } else {
      await stock.save();
    }

    res.json({ message: "Blood issued successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error issuing blood" });
  }
});

export default router;
