import express from 'express'
import  * as userMiddleware from '../middlewares/adminmidelware.js'
import * as superadmincontoller from "../controller/superadmin.controller.js"
const superadminroutes = express.Router()
superadminroutes.post('/register',userMiddleware.registeruserValigation,(req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },superadmincontoller.registersuperadmin)

superadminroutes.post('/login',superadmincontoller.superadminlogin)
// superadminroutes.post('/post',superadmincontoller) 

superadminroutes.post('/post',superadmincontoller.superadminpost) 
export {superadminroutes} 