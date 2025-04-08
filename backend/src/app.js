import express from "express";

import morgan from 'morgan'
import Registerroutes from './routes/register.js'
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use('/admin',Registerroutes)

export default app;