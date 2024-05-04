import express from 'express'
import {deleteImage, deleteVideo, getImage, getVideo, uploadImage, uploadVideo} from '../controller/multimedia.controller.js'
import upload from '../middleware/multer.middleware.js'
import { isLogin } from '../middleware/JWTauth.js'
const router = express.Router()
router.route('/post').post(isLogin,upload.single("Post"),uploadImage)
router.route('/postvideo').post(isLogin,upload.single('video'),uploadVideo)
router.route('/getimage').get(getImage)
router.route('/getvideo').get(getVideo)
router.route('/:id').delete(deleteImage),
router.route('/video/:id').delete(deleteVideo)
export default router