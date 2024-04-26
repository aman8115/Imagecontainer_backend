import express from 'express'
import {uploadImage} from '../controller/multimedia.controller.js'
import upload from '../middleware/multer.middleware.js'
const router = express.Router()
router.route('/post').post(upload.single("image"),uploadImage)
export default router