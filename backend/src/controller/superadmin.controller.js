import { header, validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import config from "../config/config.js";
import InterestModel from "../models/interest.js";
import userModel from "../models/user.js";
import {
  superadminregisterService,
  superadminloginUserService,
  superadminrefreshTokenService,
} from "../serves/superadmin.service.js";
import postModel from "../models/post.js";


export const registersuperadmin = async (req, res) => {
  const error = validationResult(req.body);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    console.log(req.body)
    const result = await superadminregisterService(req.body);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const superadminlogin = async (req, res) => {
  try {
    // console.log(req.body)
    const result = await superadminloginUserService(req.body);

    console.log(result)
    
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


export const postIntrest = async (req,res) =>{
try{
    const {data} = req.body
    if(!data){
        res.status(400).json({message:"data is missing"})
    }
    const refreshtoken = req.headers.authorization?.split(" ")[1]
const decoded = await jwt.verify(refreshtoken,config.JWT_access_SECRET)
if(!decoded){
    return res.status(400).json({message:"refresh token expired or Invalid"})
}
console.log(decoded._id)

const createInterestRecursively = async (data,parent = null ) =>{
    const newintrest = await InterestModel.create({
        name:data.name,
        parentId:parent,
        createdby:decoded._id
    })
    if(data.children && data.children.length > 0 ){
        for (const child of data.children) {
           await createInterestRecursively(child,newintrest._id)
            // console.log(newintrest)
        }

    }

}
await createInterestRecursively(data); 
return res.status(201).json({message:"Intrest created successfully"})
}
catch(error){
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
}
}

export const allpost = async(req,res) =>{
try{
    const post = await postModel.find({})
console.log(post)

if(!post){
    return res.status(403).json({message:'no post'})
}
}catch(error){
    console.log(error)
    return res.status(500).json({message:'intreanl server error'})
}
}

export const alladmin = async(req,res) =>{
 try{
    const alladmin = await userModel.find({role:"admin"})
    if(!alladmin){
       return res.status(400).json({message:"no admin is there"})
    }
    return res.status(200).json({message:"adminlist",data:alladmin})
 }catch(err){
    console.log(err)
    res.status(500).json({message:"internal server error",err})
 }
}

export const alluser = async(req,res) =>{
   try{
    const alluser = await userModel.find({role:"uer"})
    if (alluser.length === 0) {
        return res.status(404).json({ message: "No admin found" });
      }
      
    return res.status(200).json({message:"adminlist",data:alluser})
}catch(error){
    return res.status(500).json({message:"intrenal server error "})
}
   }


export const deletadmin = async(req,res) =>{
try{
    const newuser = req.params.id
console.log(newuser)
if(!newuser){
    return res.status(400).json({message:'id is required'})
}
 const user = await userModel.findOneAndDelete({_id:newuser})
 return res.status(404).json({message:'user not found'})
  
}catch(error){
    console.log(error)
    res.status(500).json({message:'error in the deletadmin',error})
}
}

