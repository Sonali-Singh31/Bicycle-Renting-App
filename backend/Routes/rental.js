import express from "express";
import Rental from "../models/Rental.js";
import Bicycle from "../models/Bicycle.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

const router = express.Router();

// Active rented bicycles for a user
router.get("/getRentedBicycleUser", verifyJwtToken, async (req, res) => {
  try {
    const rentals = await Rental.find({ userId: req.id, status: "rented" })
      .populate("bicycleId", "bicycleName costPerHour")
      .populate("requestId");
    res.status(200).json({ message: "Rented bicycles fetched successfully", data: rentals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Completed rentals for a user
router.get("/getCompletedRentsInfo", verifyJwtToken, async (req, res) => {
  try {
    const rentals = await Rental.find({ userId: req.id, status: "completed" })
      .populate("bicycleId", "bicycleName costPerHour")
      .populate("requestId");
    res.status(200).json({ message: "Completed rentals fetched successfully", data: rentals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
