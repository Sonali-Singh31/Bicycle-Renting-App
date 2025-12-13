import mongoose from "mongoose";
const rentalSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
bicycleId: { type: mongoose.Schema.Types.ObjectId, ref: "Bicycle" },
requestId: { type: mongoose.Schema.Types.ObjectId, ref: "RentRequest" }
,
rentalStartDate: { type: Number },
rentalEndDate: { type: Number },
rentalCost: { type: Number, default: 0 },
status: { type: String, enum: ["rented", "completed"], required: true }
});
export default mongoose.model("Rental", rentalSchema);