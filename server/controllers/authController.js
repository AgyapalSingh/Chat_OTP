import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/userModel.js";

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
};

const sendOtpEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rajbirsingh1813@gmail.com",
      pass: "smobxeokmvspnbtj", // Use an App Password if two-factor authentication is enabled
    },
  });

  let info = await transporter.sendMail({
    from: "rajbirsingh1813@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for email verification is: ${otp}`,
  });

  console.log("Email sent: ", info.messageId);
};

export const signup = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // OTP GENERATED
    const otp = generateOtp();
    console.log("Otp Generated", otp);

    // OTP SENT
    await sendOtpEmail(email, otp);

    // Store the email and otp in a session
    req.session.email = email;
    req.session.otp = otp;

    console.log("Email Stored in Session", req.session.email);
    console.log("OTP Stored in Session", req.session.otp);
    return res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { otpIn } = req.body;
  
  console.log("Stored in Session and use in verify", req.session.email);
  console.log("Stored in Session and use in verify", req.session.otp);
  try {
    if (!req.session || !req.session.email || !req.session.otp) {
      return res.status(403).json({ message: "Session expired or invalid" });
    }
    const storedOtp = req.session.otp;
    if (otpIn !== storedOtp) {
      return res.status(403).json({ message: "Invalid OTP" });
    }
    // Clear the session after successful verification
    req.session.destroy();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
