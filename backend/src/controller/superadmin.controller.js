import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
// import postModel from "../models/post.js";
import InterestModel from "../models/interests.js";
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


// export const superadminpost = async (req, res) => {
//     try {
//       console.log(req.body.interests);
  
//       const { name, subInterests } = req.body;
  

//       const adminAccessToken = req.headers['authorization']?.split(' ')[1];
//       if (!adminAccessToken) {
//         return res.status(400).json({ message: "Access token is missing" });
//       }
  


//       try {
//        const decoded = jwt.verify(adminAccessToken, config.JWT_access_SECRET);
// if(!decoded){
//     return res.status(403).json({message:'Invalid or expired token'})
// }
//       } catch (err) {
//         return res.status(401).json({ message: "Invalid or expired token" });
//       }
  
//       // Create and save the interest
//       const interest = new InterestModel({
//         name: name,
//         subInterests: subInterests,
//       });
  
//       await interest.save();
//       console.log(interest);
  
//       // Send response with the created interest
//       res.status(201).json(interest);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Something went wrong", error: err.message });
//     }
//   };
  

export const superadminpost = async(req,res) =>{
try{
    const {name,subInterests} =  req.body
    console.log(req.body)
    if(!name || ! subInterests) {
     res.status(400).json({message:"name or subInterests is missing"})
    }
 const accessatoken = req.headers['authorization']?.split(' ')[1]
 console.log(accessatoken)
 const decoded = await jwt.verify(accessatoken,config.JWT_access_SECRET)
 if(!decoded){
    return res.status(401).json({message:"Invalid or expired toen"})
 }

 const interest = await  InterestModel.create({
    name,
    subInterests
 })
 res.send(interest)
}
catch(error){
    console.log(error)
}
}