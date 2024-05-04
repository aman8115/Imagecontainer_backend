import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import  JWT from 'jsonwebtoken'
import{config} from "dotenv"
config()
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
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    }

    
   
    
} ,{timestamps:true})
userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        return next()


    }
    this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods = {
    matchPassword:async function(PlainText){
        return await bcrypt.compare(PlainText,this.password)
    },
    genrateToken:async function(){
        return await JWT.sign({id:this._id,fullName:this.fullName, email:this.email,mobileNumber:this.mobileNumber,},
           process.env.SECRET,
           {expiresIn:'24h'} )
            
        

    }
}

const User = mongoose.model("User",userSchema)
export default User