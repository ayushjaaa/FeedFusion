import express from 'express'
import * as userController from "../controller/user.controller.js"
import {body} from "express-validator"
import  * as userMiddleware from '../middlewares/user.middleware.js'

const Registerroutes = express.Router()

 Registerroutes.post("/register",
 userMiddleware.registeruserValigation
  ,(req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },userController.registerUser)



export {Registerroutes}

