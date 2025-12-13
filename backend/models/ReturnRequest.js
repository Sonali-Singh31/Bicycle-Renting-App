import mongoose from "mongoose";
const returnRequestSchema = new mongoose.Schema({
rentalId: { type: mongoose.Schema.Types.ObjectId, ref: "Rental" },
returnStatus: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
requestCreatedTime: { type: Number, default: Date.now },
requestApprovedTime: { type: Number },
approvedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "User"
}
});
export default mongoose.model("ReturnRequest", returnRequestSchema);
