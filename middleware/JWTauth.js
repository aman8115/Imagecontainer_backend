import JWT from 'jsonwebtoken'
import { config } from 'dotenv'
import AppError from './errormiddleware.js'
config()
export const isLogin = async(req,res,next)=>{
    const token = (req.cookies && req.cookies.token)||null
    console.log("token",token)
    if(!token){
        return next ( new AppError(" Please Login "),500)
    }
    try{
        const payload = await JWT.verify(token,process.env.SECRET)
       
        if(!payload){
            return next (new AppError(' payload not find '))
        }
       
       req.user = payload;
       
        return next();
  
    }catch(e){
        return next( new AppError(` Token not find successfully ${e.message}`))
    }
}