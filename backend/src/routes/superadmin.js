import express from 'express'
import  * as userMiddleware from '../../middlewares/adminmidelware.js'
import * as superadmincontoller from "../controller/superadmin.controller.js"
import { authmidelware } from '../../middlewares/authmidelware.js'
const superadminroutes = express.Router()
superadminroutes.post('/register',userMiddleware.registeruserValigation,(req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },superadmincontoller.registersuperadmin)

superadminroutes.post('/login',superadmincontoller.superadminlogin)

superadminroutes.post('/intrest',superadmincontoller.postIntrest)
superadminroutes.post('/alladmin',authmidelware,superadmincontoller.alladmin)
superadminroutes.post('/alluser',authmidelware,superadmincontoller.alluser)
export {superadminroutes} 