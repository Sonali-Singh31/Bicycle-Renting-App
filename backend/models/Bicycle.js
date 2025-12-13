import mongoose from "mongoose";
const bicycleSchema = new mongoose.Schema({
bicycleName: { type: String, required: true },
available: { type: Boolean, default: true },
addedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
costPerHour: { type: Number, required: true },
createdTime: { type: Number, default: Date.now }
});
export default mongoose.model("Bicycle", bicycleSchema);