import express from "express";
import ReturnRequest from "../models/ReturnRequest.js";
import Rental from "../models/Rental.js";
import Bicycle from "../models/Bicycle.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
import { verifyAdmin } from "../middleware/verify_admin.js";

const router = express.Router();

// Add return request
router.post("/addReturnRequest", verifyJwtToken, async (req, res) => {
  try {
    const { rentalId } = req.body;
    const request = await ReturnRequest.create({
      rentalId,
      returnStatus: "Pending",
      requestCreatedTime: Date.now(),
    });
    res.status(200).json({ message: "Return request added successfully", data: request });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Validate return request (admin)
router.post("/validateReturnRequest", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const { returnId, requestStatus } = req.body;
    const request = await ReturnRequest.findById(returnId).populate("rentalId");
    if (!request) return res.status(404).json({ message: "Return request not found" });
    if (request.returnStatus !== "Pending") return res.status(400).json({ message: "Invalid return status" });

    request.returnStatus = requestStatus;
    request.requestApprovedTime = Date.now();
    request.approvedByAdminId = req.id;
    await request.save();

    if (requestStatus === "Approved") {
      const rental = await Rental.findById(request.rentalId);
      rental.status = "completed";
      rental.rentalEndDate = request.requestApprovedTime;

      const hours = (rental.rentalEndDate - rental.rentalStartDate) / (1000 * 60 * 60);
      const bicycle = await Bicycle.findById(rental.bicycleId);
      rental.rentalCost = hours * bicycle.costPerHour;
      await rental.save();

      await Bicycle.updateOne({ _id: rental.bicycleId }, { available: true });
    }

    res.status(200).json({ message: "Return request processed", data: request });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Pending return requests for user
router.get("/getPendingReturnRequestUser", verifyJwtToken, async (req, res) => {
  try {
    const requests = await ReturnRequest.find({ returnStatus: "Pending" })
      .populate({
        path: "rentalId",
        match: { userId: req.id },
        populate: { path: "bicycleId", select: "bicycleName costPerHour" }
      });
    res.status(200).json({ message: "Pending return requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Pending return requests for admin
router.get("/getPendingReturnRequestAdmin", verifyJwtToken, verifyAdmin, async (req, res) => {
  try {
    const requests = await ReturnRequest.find({ returnStatus: "Pending" })
      .populate({
        path: "rentalId",
        populate: [
          { path: "bicycleId", select: "bicycleName" },
          { path: "userId", select: "firstName lastName" }
        ]
      });
    res.status(200).json({ message: "Pending return requests fetched", data: requests });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
