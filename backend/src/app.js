import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import {Registerroutes} from './routes/user.js'
import { superadminroutes } from "./routes/superadmin.js";
import superadminrefresroute from './routes/superadminrefreshtoken.js'
import loginroutes from "./routes/loginroute.js";
import refresTokenroute from "./routes/accesstoken.js";

const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/admin&userRegister',Registerroutes)
app.use('/admin&userLogin',loginroutes)
app.use('/refresh',refresTokenroute)
app.use('/superadmin',superadminroutes)
app.use('/superadmin',superadminrefresroute)





export default app;