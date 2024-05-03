import express from 'express'
import {uploadImage, uploadVideo} from '../controller/multimedia.controller.js'
import upload from '../middleware/multer.middleware.js'
const router = express.Router()
router.route('/post').post(upload.single("Post"),uploadImage)
router.route('/postvideo').post(upload.single('video'),uploadVideo)
export default router