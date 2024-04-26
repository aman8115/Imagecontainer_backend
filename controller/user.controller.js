import User from '../model/user.model.js'
import AppError from '../utils/utils.js'
import path from 'path'
import  cloudinary from 'cloudinary'
import fs from 'fs/promises'
const cookiOption = {
  maxAge:12*60*60*1000,
  httpOnly:true,
  secure:true
}
console.log(cookiOption)
const createAccount =  async (req,res,next)=>{
    
       const{fullName,email,mobileNumber,password} = req.body;
     
       if(!fullName||!email||!mobileNumber ||!password){
       return next(new AppError("All filed is required"),500)
       }
       const existUser = await User.findOne({email})
       if(existUser){
        return next(new AppError("user already rgistered  with this email"))
       }
       const user = await User.create({
        fullName, email,mobileNumber,password,
     
        
       })
       if(!user){
        return next(new AppError(" Account could not create try again!!"))
       }
       
      if(req.file){
        try{
               const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"imagecontainer",
                width:250,
               height:250,
               gravity:'faces',
               crop:'fill'
               
               })
               if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url
                fs.rm(`uploads/${req.file.filename}`)
               }
        }catch(e){
          return next (new AppError(' file not uploaded try again!!'),500)

        }
      }
       await user.save()
      user.password = undefined
       res.status(200).json({
        success:true,
        message:"User Rgistration successfull ",
        userInfo:user
       })
      
       
       
       
}
const LogIn = async(req,res,next)=>{
 try{
  const{email,password} = req.body;
  
  if(!email||!password){
  return next (new AppError(" emial and password is required!!"))
    
  }
  const user = await User.findOne({email}).select("+password")
  console.log(user)
 
  if(!user&&!(await user.matchPassword(password))){
    return next (new AppError(' Please Enter vaild password'))
  }
  const token = await user.genrateToken()

  res.cookie('token',token,cookiOption)
  user.password = undefined
  res.status(200).json(
   { success:true,
    message:" user login successfully ",
    user:user
}
  )

 }catch(e){
  res.status(500).json({
    success:false,
    message:` user not login ${e.message}`,

  })
 }
}
const getProfile = async(req,res,next)=>{
      try{
        const userId = req.user.id
        
        const user = await User.findById(userId)
       
        res.status(200).json({
          success:true,
          message:" user profile get successfully",
          userInfo:user
        })
      }catch(e){
         res.status(500).json({
          success:false,
          message:` user not exixt in database${e.message}`
         })
      }
}
const Logout = async(req,res,next)=>{
  try{
    const cookieOption = {
      maxAge:0,
      secure:true,
      httpOnly:true,
    }
    res.cookie("token",null,cookiOption)
    res.status(200).json({
      success:true,
      message:" user logout successfully"
    })

  }catch(e){
    return next (new AppError(" user not logout successfully"))

  }
}

const updateProfile = async(req, res, next)=>{
  const{fullName,mobileNumber} = req.body
  
  const{id } = req.params;
 
  const user = await User.findById(id)
 
  if(!user){
    return next(new AppError(' user doesnot exist in database '))
  }
  if(fullName && mobileNumber){
    user.fullName = fullName
    user.mobileNumber = mobileNumber
  }
  await cloudinary.v2.uploader.destroy(user.avatar.secure_url)
  if(req.file){
    try{
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
          folder:'imagecontainer',
          width:256,
          height:256,
          gravity:'faces',
          crop:'fill'
        })
        if(result){
          user.avatar.public_id = result.public_id
          user.avatar.secure_url = result.secure_url;
        }
    }catch(e){
             return next(new AppError(` file not updated successfully ${ e.message}`))
    }
  }
  await user.save()
  res.status(200).json({
    success:true,
    message:' Profile updated successfully',
    user
  })
}
const deleteAccount = async  (req,res,next)=>{
  try{
    const id = req.user.id
    if(!id){
      return next(new AppError("Please LogIn in your account "))
    }
    const user = await User.findById(id)
   
    if(!user){
      return next(new AppError(" user dosenot exist in database"))
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({
      success:true,
      message:' your profile deleted successfully',
      user
    })

  }catch(e){
    return next(new AppError(` you profile couldnot delete ${e.message}`))
  }
}
export{
    createAccount,
    LogIn,
    getProfile,
    updateProfile,
    Logout,
    deleteAccount
}