import userModel from "../models/user.js";
import { validationResult } from "express-validator";

const ALLOWED_ROLES = ["user", "admin"];

export const registerUser = async (req, res) => {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()})
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
    console.error(" Register Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const loginUser = async (req,res) =>{
  
    const ALLOWED_ROLES = ["user", "admin"];
   const {email,password,role} = req.body
   
   const normalizedRole = role.toLowerCase();
   if(!ALLOWED_ROLES.includes(role)){
       return res.status(403).json({message:"roel is not allwoed"})
   
   }
   const user = userModel.find({email})
   if(!user){
    return res.status(400).json({message:"email is required"})
   }
  const newuser = user.comaprepassword(password)
  console.log(newuser)
   

}