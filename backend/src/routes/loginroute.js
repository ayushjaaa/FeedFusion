import express from 'express'
const loginroutes = express.Router()

import * as userController from '../controller/user.controller.js'

loginroutes.post("/login",userController.loginUser)

export default loginroutes