import express from "express";
import * as userController from "../controller/user.controller.js";
import { body } from "express-validator";
import * as userMiddleware from "../../middlewares/user.middleware.js";

const Userroutes = express.Router();


// register// 
Userroutes.post(
  "/register",
  userMiddleware.registeruserValigation,
  (req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },
  userController.registerUser
);


//login//
Userroutes.post('/login',
  userMiddleware.registeruserValigation,
  (req, res, next) => {
    console.log("login  POST hit!");
    next(); // Continue to actual handler
  },userController.loginUser)


export { Userroutes };
