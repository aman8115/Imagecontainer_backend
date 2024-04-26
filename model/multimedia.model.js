import mongoose from "mongoose";

const multimedieaSchema = new mongoose.Schema({
    nameOfimage:{
        type:String,
        required:[true,"name is required"],
        lowercase:true
    },
    description:{
        type:String,
        required:[true,'description is required '],
        lowercase:true
    },
    image:{
       public_id:{
        type:String
       },
       secure_url:{
        type:String
       }
    }

},{timestamps:true})
const MedieaSchema = mongoose.model("medieaSchema", multimedieaSchema)
export default MedieaSchema;