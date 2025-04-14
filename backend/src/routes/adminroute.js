import express from 'express'
import { adminpostController,adminpostpostcontroller } from '../controller/user.controller.js'
const adminrouest = express.Router()
adminpostController
adminrouest.get('/post',adminpostController)
adminrouest.post('/post',adminpostpostcontroller)
export default adminrouest