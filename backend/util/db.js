import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error(" MONGO_URI is missing");
      return;
    }

    if (mongoose.connection.readyState === 1) {
      return; // already connected
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    //  NEVER process.exit() on Vercel
  }
};

export default connectDB;
