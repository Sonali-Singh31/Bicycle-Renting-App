import mongoose from "mongoose";
const rentRequestSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
bicycleId: { type: mongoose.Schema.Types.ObjectId, ref: "Bicycle" },
requestStatus: { type: String, enum: ["Pending", "Approved", "Rejected"
], default: "Pending" },
requestDate: { type: Number, default: Date.now },
requestApprovedTime: { type: Number },
approvedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "User"
}
});
export default mongoose.model("RentRequest", rentRequestSchema);
