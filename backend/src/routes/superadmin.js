import express from 'express'
import  * as userMiddleware from '../../middlewares/adminmidelware.js'
import * as superadmincontoller from "../controller/superadmin.controller.js"
import { authmidelware } from '../../middlewares/authmidelware.js'
const superadminroutes = express.Router()
import { verifyrolemiddleware } from '../../../backend/middlewares/verifyrolemidelware.js'
superadminroutes.post('/register',userMiddleware.registeruserValigation,(req, res, next) => {
    console.log("Incoming register POST hit!");
    next(); // Continue to actual handler
  },superadmincontoller.registersuperadmin)

superadminroutes.post('/login',superadmincontoller.superadminlogin)

superadminroutes.post('/intrest',superadmincontoller.postIntrest)
superadminroutes.get('/fetchintrest',authmidelware,superadmincontoller.fetchintrest)

superadminroutes.get('/alladmin',authmidelware,superadmincontoller.alladmin)
superadminroutes.post('/allpost',authmidelware,superadmincontoller.allpost)
superadminroutes.get('/alluser',authmidelware,superadmincontoller.alluser)
superadminroutes.get('/createpost',authmidelware,superadmincontoller.createpost)
superadminroutes.post('/deleteadmin/:id',authmidelware,superadmincontoller.deletadmin) // send id in the params mtlb jub admin display kar rhe ho to to side mai ek delet ka button ho ga wo uski id params mai send ho gi phir delet ho jae ge 
superadminroutes.post('/deleteuser/:id',authmidelware,superadmincontoller.deletadmin) // send id in the params mtlb jub user display kar rhe ho to to side mai ek delet ka button ho ga wo uski id params mai send ho gi phir delet ho jae ge 

export {superadminroutes} 