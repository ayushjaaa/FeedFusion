import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const ALLOWED_ROLES = ["user", "admin"];

export const registerUserService = async ({ username, email, password, role }) => {
  const normalizedRole = role.toLowerCase();

  if (!ALLOWED_ROLES.includes(normalizedRole)) {
    return { status: 403, message: "Role not allowed directly" };
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return { status: 400, message: "User already exists"  };
  }

  const newUser = await userModel.create({
    username,
    email,
    password,
    role: normalizedRole,
  });

  return {
    status: 201,
    message: `${normalizedRole} registered successfully`,
    user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

export const loginUserService = async ({ email, password, role }) => {
  const normalizedRole = role.toLowerCase();

  if (!ALLOWED_ROLES.includes(normalizedRole)) {
    return { status: 403, message: "Role is not allowed" };
  }

  const user = await userModel.findOne({ email });
  if (!user) return { status: 400, message: "Invalid credentials" };

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return { status: 400, message: "Invalid credentials" };

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken.push(refreshToken);
  await user.save();

  return { status: 200, accessToken, refreshToken };
};

export const refreshTokenService = async (token) => {
  if (!token) {
    return { status: 401, message: "Refresh token missing" };
  }

  const user = await userModel.findOne({ refreshToken: token });

  if (!user || !user.refreshToken.includes(token)) {
    return { status: 403, message: "Invalid refresh token" };
  }

  try {
    // console.log(config.JWT_REFERESH_SECRET)
    jwt.verify(token, config.JWT_REFERESH_SECRET);
    const newAccessToken = user.generateAccessToken();
    return { status: 200, accessToken: newAccessToken };
  } catch (error) {
    console.error("Refresh Token Verify Error:", error.message);
    return { status: 403, message: "Token expired or invalid" };
  }
};
