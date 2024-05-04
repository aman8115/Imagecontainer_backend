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
 const getImage = async(req,res,next)=>{
          try{
            const Images = await MedieaSchema.find()
            if(!Images) {
                return next(new AppError (' Images not fetched successfully'))
            }
            res.status(200).json({
                success:true,
                message:' Images Fetched successfully',
                Images
            })
          }catch(e){
             return next(new AppError(` Images  doesnot exist in database${e.message}`))
          }
 }
 const getVideo = async(req,res,next)=>{
    try{
        const videos = await videoModel.find()
        if(!videos){
            return next(new AppError(' Videos could not fetched successfully'))
        }
        res.status(200).json({
            success:true,
            message:' Video fetched successfully',
            videos
        })
    }catch(e){
        return next(new AppError(` Videos doesnot exist in database ${e.message}`))
    }
 }
 const deleteImage = async(req,res,next)=>{
    try{
       const{id} = req.params
       console.log(id)
       const Post = await MedieaSchema.findById(id)
       console.log(Post)
       await MedieaSchema.findByIdAndDelete(id)
       res.status(200).json({
        success:true,
        message:' image deleted successfully',
        Post
       })
        
    }catch(e){
        return next(new AppError(` Image couldnot delete`))
    }
 }
 const deleteVideo = async(req,res,next)=>{
    try{
       const{id} = req.params;
       const Video = await videoModel.findById(id)
       console.log(Video)
       if(!Video){
        return next(new AppError(' Video does not exist in database'))
       }
       await videoModel.findByIdAndDelete(id)
       res.status(200).json({
        success:true,
        message:" Video deleted successfully",
        Video
       })
    }catch(e){
        return next (new AppError(` Video could not deleted ${e.message}`))
    }
 }
export{
    uploadImage,
    uploadVideo,
    getImage,
    getVideo,
    deleteImage,
    deleteVideo
}