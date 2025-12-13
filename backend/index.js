import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./util/db.js";
import userRoutes from "./Routes/user.js";
import bicycleRoutes from "./Routes/bicycle.js";
import rentRequestRoutes from "./Routes/rentRequest.js";
import returnRequestRoutes from "./Routes/returnRequest.js";
import rentalRoutes from "./Routes/rental.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Connect MongoDB
connectDB();
// Routes
app.use("/api/user", userRoutes);
app.use("/api/bicycle", bicycleRoutes);
app.use("/api/rentRequest", rentRequestRoutes);
app.use("/api/returnRequest", returnRequestRoutes);
app.use("/api/rental", rentalRoutes);
app.listen(6001, () => {
console.log("App listening on port 6001");
});