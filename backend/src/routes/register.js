import express from 'express'
import { registerUser } from "../controller/userRegister.controller.js"; 


const Registerroutes = express.Router()

Registerroutes.post("/register",(req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },registerUser)

export default Registerroutes
