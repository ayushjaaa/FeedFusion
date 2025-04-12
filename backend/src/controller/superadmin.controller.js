import { validationResult } from "express-validator";
import {
  superadminregisterService,
  superadminloginUserService,
  superadminrefreshTokenService,
} from "../Service/superadmin.service.js";

export const registersuperadmin = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const result = await superadminregisterService(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const superadminlogin = async (req, res) => {
  try {
    const result = await superadminloginUserService(req.body);

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
    console.log(req.cookies.RefreshToken)
  const token = req.cookies.RefreshToken;
//   console.log(token)
  const result = await superadminrefreshTokenService(token);

  if (result.status !== 200) {
    return res.status(result.status).json({ message: result.message });
  }

  res.json({ accessToken: result.accessToken });
};

