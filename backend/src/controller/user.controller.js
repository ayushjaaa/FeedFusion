import { validationResult } from "express-validator";
import {
  registerUserService,
  loginUserService,
  refreshTokenService,
} from "../Service/user.service.js";

export const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const result = await registerUserService(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    res.cookie("RefreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    }).json({ accessToken: result.accessToken });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.RefreshToken;
  const result = await refreshTokenService(token);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.json({ accessToken: result.accessToken });
};
