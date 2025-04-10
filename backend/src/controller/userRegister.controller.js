import userModel from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const ALLOWED_ROLES = ["user", "admin"];

export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { username, email, password, role } = req.body;
    const normalizedRole = role.toLowerCase();

    if (!ALLOWED_ROLES.includes(normalizedRole)) {
      return res.status(403).json({ message: "Role not allowed directly" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await userModel.create({
      username,
      email,
      password,
      role: normalizedRole
    });

    res.status(201).json({
      message: `${normalizedRole} registered successfully`,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedRole = role.toLowerCase();

    if (!ALLOWED_ROLES.includes(normalizedRole)) {
      return res.status(403).json({ message: "Role is not allowed" });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken.push(refreshToken);
    await user.save();

    res.cookie("RefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    }).json({ accessToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.RefreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const user = await userModel.findOne({ refreshToken: token });
  if (!user || !user.refreshToken.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  jwt.verify(token, config.JWT_REFERESH_SECRET, (error, decoded) => {
    if (error) {
      console.error("Refresh Token Verify Error:", error.message);
      return res.status(403).json({ message: "Token expired or invalid" });
    }

    const newAccessToken = user.generateAccessToken();
    res.json({ accessToken: newAccessToken });
  });
};
