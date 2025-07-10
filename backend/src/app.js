import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan'
import {Userroutes} from './routes/user.js'
import { superadminroutes } from "./routes/superadmin.js";
import refreshroute from './routes/superadminrefreshtoken.js'

import refresTokenroute from "./routes/accesstoken.js";
import { adminRoutes } from "./routes/admin.js";
import commanroutes from "./routes/commanroute.js";
import cors from 'cors';


const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // 🔁 make sure this matches your frontend port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

  
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/admin&user',Userroutes) // login and register route of user //
app.use('/api/auth',refresTokenroute) // refresh token for user and admin //
app.use('/superadmin',superadminroutes) // super admin login and register   //
// app.use('/api/auth',refreshroute ) // superadmin refresh  



// user //
app.use('/user',Userroutes)
app.use("/admin",adminRoutes)


//coman //after auth//

app.use('/commanroutes',commanroutes)

export default app;