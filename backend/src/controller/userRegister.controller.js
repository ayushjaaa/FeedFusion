import user from "../models/user.js";
const ALLOWED_ROLES = ["user", "admin"];

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const normalizedRole = role.toLowerCase();

    if (!ALLOWED_ROLES.includes(normalizedRole)) {
      return res.status(403).json({ message: "Role not allowed directly" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await user.create({
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
    console.error(" Register Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
