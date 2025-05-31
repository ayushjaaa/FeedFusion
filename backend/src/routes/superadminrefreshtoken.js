import express from 'express'
const refreshroute = express.Router()
import * as superadmincontoller from '../controller/superadmin.controller.js'
refreshroute.post('/refresh',superadmincontoller.refreshToken)

export default refreshroute