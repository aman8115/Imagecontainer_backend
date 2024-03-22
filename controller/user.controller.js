import User from '../model/user.model.js'
import AppError from '../utils/utils.js'
import path from 'path'
import  cloudinary from 'cloudinary'
import fs from 'fs/promises'
const createAccount =  async (req,res,next)=>{
    
       const{fullName,email,mobileNumber,password} = req.body;
       console.log(fullName,email,mobileNumber,password)
       if(!fullName||!email||!mobileNumber ||!password){
       return next(new AppError("All filed is required"),500)
       }
       const existUser = await User.findOne({email})
       if(existUser){
        return next(new AppError("user already rgistered  with this email"))
       }
       const user = await User.create({
        fullName, email,mobileNumber,password,
        avatar:{
            public_id:'dummy',
            secure_url:"https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
        }
        
       })
       if(!user){
        return next(new AppError(" Account could not create try again!!"))
       }
      
       if(req.file){
        try{
          const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
          })
          if(result){
            user.avatar.public_id = result.public_id;
            user.avatar.secure_url = result.secure_url;
            fs.rm(`uploads/${req.file.filename}`)
          }
    
        }catch(e){
          return next( new AppError(` file not upload try again ${e.message}`))
    
        }
      }
       await user.save()
       user.password = undefined
       res.status(200).json({
        success:true,
        message:"User Rgistration successfull ",
        userInfo:user
       })
      
       
        res.status(400).json({
           success:false,
           message:` your user  not create`
        })
       
}
export{
    createAccount
}