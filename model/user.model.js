import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Name is required"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        lowercase:true,
        trim:true
    },
    mobileNumber:{
        type:Number,
        required:[true,"mobileNumber is required"],
        trim:true

    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true,
        select:false
    }
    
    
    
})

const User = mongoose.model("User",userSchema)
export default User