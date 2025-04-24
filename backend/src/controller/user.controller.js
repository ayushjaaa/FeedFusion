import { validationResult } from "express-validator";
import {
  registerUserService,
  loginUserService,
  refreshTokenService,
} from "../serves/user.service.js";
import jwt from 'jsonwebtoken'
import PostModel from "../models/post.js";
import userModel from "../models/user.js";
import likeModel from '../models/like.js'
export const registerUser = async (req, res) => {
  console.log('register')
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


export const posttcreat = async(req,res)=>{
  const user = req.user
  const data = req.body
  PostModel.create({
    title:data.title,
    content:data.content,
    createdBy:user._id,
    interests:data.interests,
    
  })
  res.status(200).json({data})
}

export const getallpost = async (req,res)=>{
  try{
    const user = req.user
  const userId = user._id
  const allpost = await PostModel.find({createdBy:userId}).populate('createdBy')
 return res.status(400).json({message:"all post",allpost})
  }catch(error){
    console.log(error)
    return res.status(500).json({message:"reffrance error",error})
  }

}

export const editpost = async(req,res) =>{
const postId = req.params.id
const {title,content,interests} = req.body
const updatedPost = await PostModel.findByIdAndUpdate(
  postId, // jis post ko update karna hai
  {
    title: title,
    content:content,
    interests:interests
  },
  {
    new: true // updated document return karega
  }
);

}


export const intrestpost = async(req,res)  =>{ 
try{
  const user = req.user
const  {selectedInterests} =  req.body
 if(!selectedInterests){
  return res.status(400).json({message:"intrest is required"})
 }
const finduser = await userModel.findByIdAndUpdate({_id:user._id},{
  selectedInterests:selectedInterests
}, { new: true }).populate('selectedInterests')
// console.log(finduser)
const allpsot = await PostModel.find({interests:finduser.selectedInterests})
return res.status(200).json({message:"user found and updated intrest",allpsot})

}catch(error){
  console.log(error)
return  res.status(500).json({message:"intrenal server error",error})
}
}

export const likepost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const isLikeExist = await likeModel.findOne({ user: userId, post: postId });

    if (isLikeExist) {
      await likeModel.findOneAndDelete({ user: userId, post: postId });

      const post = await PostModel.findById(postId);
      if (post.likeCount > 0) {
        await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
        return res.status(200).json({ message: 'Like removed' });
      } else {
        return res.status(400).json({ message: "Can't decrease like below 0" });
      }
    }

    await likeModel.create({ user: userId, post: postId });
    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

    return res.status(200).json({ message: 'Like added' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};


export const save = async(req,res) =>{
  const postID =  req.params
  

}


export const tranding = async(req,res) =>{
 const post = await PostModel.findOne().sort({likeCount:-1})
 console.log(post)
}