import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        lowercase:true,
        required:[true,'title is required']
    },
    description:{
      type:String,
      lowercase:true,
      required:[true,'description is required ']
    },
    video:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    }
}, {timestamps:true})
const videoModel = mongoose.model('videoModel',videoSchema)
export default videoModel