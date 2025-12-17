import express from "express";
import Bicycle from "../models/Bicycle.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
import { verifyAdmin } from "../middleware/verify_admin.js";

const router = express.Router();

// 🔹 Add a bicycle
router.post("/add", verifyJwtToken, async (req, res) => {
  try {
    const { bicycleName, costPerHour } = req.body;
    const addedByUserId = req.id;

    const bicycle = await Bicycle.create({
      bicycleName,
      costPerHour,
      addedByUserId,
      createdTime: Date.now(),
    });

    res.status(200).json({ message: "Bicycle added successfully", data: bicycle });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get all bicycles (admin only, formatted for frontend)
router.get("/all", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const bicycles = await Bicycle.find()
      .populate("addedByUserId", "firstName lastName username usertype")
      .sort({ createdTime: -1 });

    const formatted = bicycles.map(b => ({
      bicycle_id: b._id,
      bicycle_name: b.bicycleName,
      available: b.available ? 1 : 0,
      cost_per_hour: b.costPerHour,
      added_by_firstName: b.addedByUserId?.firstName || "",
      added_by_lastName: b.addedByUserId?.lastName || "",
      added_by_username: b.addedByUserId?.username || "",
      added_by_usertype: b.addedByUserId?.usertype || "",
      created_time: b.createdTime
    }));

    res.status(200).json({ message: "Bicycles fetched successfully", data: formatted });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Get available bicycles
router.get("/available", async (req, res) => {
  try {
    const bicycles = await Bicycle.find({ available: true }).sort({ createdTime: -1 });

    const formatted = bicycles.map(b => ({
      bicycle_id: b._id,
      bicycle_name: b.bicycleName,
      available: b.available ? 1 : 0,
      cost_per_hour: b.costPerHour,
      created_time: b.createdTime
    }));

    res.status(200).json({ message: "Available bicycles fetched successfully", data: formatted });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// 🔹 Delete a bicycle (admin only)
router.get("/delete", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const { bicycleId } = req.query;
    if (!bicycleId) return res.status(400).json({ message: "Bicycle ID is missing" });

    await Bicycle.deleteOne({ _id: bicycleId });
    res.status(200).json({ message: "Bicycle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
