import express from 'express'
const commanroutes = express.Router()
import { authmidelware } from '../../middlewares/authmidelware.js'
import * as commancontroller from "../controller/commanapicontroller.js"
commanroutes.get('/fetchintrest',authmidelware,commancontroller.fetchintrest)

export default commanroutes