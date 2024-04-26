import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dataBase_Connection from './config/config.js'
import errormiddleware from './middleware/errormiddleware.js'

import router from './routers/user.router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))
dataBase_Connection()
app.use('/user',router)
app.all('*',(req,res)=>{
    res.status(400).send("Oops !! somthing went wrong")

    })



app.use(errormiddleware)
export default app