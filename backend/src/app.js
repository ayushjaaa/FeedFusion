import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import {Userroutes} from './routes/user.js'
import { superadminroutes } from "./routes/superadmin.js";
import superadminrefresroute from './routes/superadminrefreshtoken.js'

import refresTokenroute from "./routes/accesstoken.js";


const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/admin&user',Userroutes) // login and register route of user //
app.use('/admin&user',refresTokenroute) // refresh token for user and admin //
app.use('/superadmin',superadminroutes) // super admin login and register //
app.use('/superadmin',superadminrefresroute) // superadmin refresh 





export default app;