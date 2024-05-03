import express from 'express'
import {uploadImage, uploadVideo} from '../controller/multimedia.controller.js'
import upload from '../middleware/multer.middleware.js'
import { isLogin } from '../middleware/JWTauth.js'
const router = express.Router()
router.route('/post').post(isLogin,upload.single("Post"),uploadImage)
router.route('/postvideo').post(isLogin,upload.single('video'),uploadVideo)
export default router