import AppError from "../utils/utils.js";
import  cloudinary from 'cloudinary'
import MedieaSchema from "../model/multimedia.model.js";
import path from 'path'
 const uploadImage = async(req,res,next)=>{
    const {nameOfimage,description} = req.body;
    if(!nameOfimage||!description){
        return next(new AppError("All field is required "))
    }
    const Mediea = await MedieaSchema.create({
        nameOfimage,
        description
    })
    if(!Mediea){
        return next( new AppError(" mediea not create "))
    }
    if(req.file){
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'imagecontainer',
                width:300,
                height:300,
                 gravity:'auto',
                 crop:'fill',
                 resource_type:'image',
                 chunk_size:6000000
            })
            if(result){
                Mediea.image.public_id = result.public_id;
                Mediea.image.secure_url = result.secure_url;
            }

        }catch(e){
            return next (new AppError(` file not uploaded try again ${ e.message}`))
        }

    }
    await Mediea.save()
    res.status(200).json({
        success:true,
        message:' Image  Post successfull',
        Mediea
    })
 }
export{
    uploadImage
}