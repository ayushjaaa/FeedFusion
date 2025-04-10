import express from 'express'
const refresTokenroute = express.Router()
import * as userController from '../controller/userRegister.controller.js'
refresTokenroute.post('/refresh-token',userController.refreshToken)

export default refresTokenroute