import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: {
        type: String
    },
    otp: {
        type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("otp", otpSchema);
