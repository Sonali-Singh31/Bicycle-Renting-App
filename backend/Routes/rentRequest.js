import express from "express";
import RentRequest from "../models/RentRequest.js";
import Rental from "../models/Rental.js";
import Bicycle from "../models/Bicycle.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
import { verifyAdmin } from "../middleware/verify_admin.js";

const router = express.Router();

// Add rent request
router.post("/addRentRequest", verifyJwtToken, async (req, res) => {
  try {
    const { bicycleId } = req.body;
    const request = await RentRequest.create({
      userId: req.id,
      bicycleId,
      requestStatus: "Pending",
      requestDate: Date.now(),
    });
    await Bicycle.updateOne({ _id: bicycleId }, { available: false });
    res.status(200).json({ message: "Rent request added successfully", data: request });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Pending rent requests for admin
router.get("/getPendingRentRequestAdmin", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const requests = await RentRequest.find({ requestStatus: "Pending" })
      .populate("bicycleId", "bicycleName costPerHour")
      .populate("userId", "firstName lastName username");
    res.status(200).json({ message: "Pending rent requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update rent request (approve/reject)
router.post("/updateRentRequest", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const { requestId, requestStatus } = req.body;
    const request = await RentRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Rent request not found" });
    if (request.requestStatus !== "Pending") return res.status(400).json({ message: "Invalid request status" });

    request.requestStatus = requestStatus;
    request.requestApprovedTime = Date.now();
    request.approvedByAdminId = req.id;
    await request.save();

    if (requestStatus === "Approved") {
      await Rental.create({
        userId: request.userId,
        bicycleId: request.bicycleId,
        requestId: request._id,
        rentalStartDate: Date.now(),
        status: "rented",
      });
    } else if (requestStatus === "Rejected") {
      await Bicycle.updateOne({ _id: request.bicycleId }, { available: true });
    }

    res.status(200).json({ message: "Rent request updated", data: request });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User's pending requests
router.get("/getPendingRentRequestUser", verifyJwtToken, async (req, res) => {
  try {
    const requests = await RentRequest.find({ userId: req.id, requestStatus: "Pending" })
      .populate("bicycleId", "bicycleName costPerHour");
    res.status(200).json({ message: "Pending rent requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Approved Rent Requests (admin only)
router.get(
  "/getApprovedRentRequests",
  verifyJwtToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const requests = await RentRequest.find({
        requestStatus: "Approved",
      })
        .populate("bicycleId", "bicycleName costPerHour")
        .populate("userId", "firstName lastName username")
        .populate("approvedByAdminId", "firstName lastName username");

      res.status(200).json({
        message: "Approved rent requests fetched",
        data: requests,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);



export default router;
