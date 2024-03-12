import User from '../model/user.model.js'
import AppError from '../utils/utils.js'
const createAccount =  async (req,res,next)=>{
    try{
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
        fullName, email,mobileNumber,password
       })
       if(!user){
        return next(new AppError(" Account could not create try again!!"))
       }
       await user.save()
       user.password = undefined
       res.status(200).json({
        success:true,
        message:"User Rgistration successfull ",
        userInfo:user
       })
      
       }catch(e){
        res.status(400).json({
           success:false,
           message:` your user  not create${e.message}`
        })
       }
}
export{
    createAccount
}