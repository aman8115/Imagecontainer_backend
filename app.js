import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './routers/user.router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/user',router)
export default app