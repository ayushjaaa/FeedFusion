import express from 'express'
const arefresTokenroute = express.Router()
import * as superadmincontoller from '../controller/superadmin.controller.js'
arefresTokenroute.post('/superadminrefresh-token',superadmincontoller.refreshToken)

export default arefresTokenroute