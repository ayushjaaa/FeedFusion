import express from 'express'
import { authmidelware } from '../../middlewares/authmidelware.js'
import {posttcreat,getallpost,editpost} from '../controller/user.controller.js'
const adminRoutes = express.Router()
adminRoutes.post('/post',authmidelware,posttcreat)
adminRoutes.get('/allpost',authmidelware,getallpost)
adminRoutes.put('/edit/:id',authmidelware,editpost)

export {adminRoutes}