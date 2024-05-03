import AppError from "../utils/utils.js";
import  cloudinary from 'cloudinary'
import MedieaSchema from "../model/multimedia.model.js";
import videoModel from "../model/video.model.js";

import path from 'path'
import fs from 'fs/promises'
import { sendMail } from "../utils/SendMail.js";
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
                folder:"imagecontainer",
                width:250,
               height:250,
               gravity:'faces',
               crop:'fill'
               
               })
               if(result){
                Mediea.Post.public_id = result.public_id;
                Mediea.Post.secure_url = result.secure_url
                fs.rm(`uploads/${req.file.filename}`)
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
 const uploadVideo = async(req,res,next)=>{
    const{title,description} = req.body;
     if(!title||!description){
        return next( new AppError(" Please enter the description and title"))
     }
     const Video = await videoModel.create({
        title,description
     })
     if(!Video){
        return next (new AppError(" Post could not created "))
     }
   
   if(req.file){
    try{
      const result = await cloudinary.v2.uploader.upload(req.file.path,{
        folder:'imagecontainer',
        resource_type:'video',
        chunk_size:6000000
      })
      if(result){
        Video.video.public_id = result.public_id;
        Video.video.secure_url = result.secure_url;
        fs.rm(`uploads/${req.file.filename}`)
      }
    }catch(e){
        return next(new AppError(` file not uploaded try again!! ${e.message}`))
    }
   }
   await Video.save()
   res.status(200).json({
    success:true,
    message:' video uplaoded successffully',
    Video
   })
 }
export{
    uploadImage,
    uploadVideo
}