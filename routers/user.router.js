import express  from 'express'
import { createAccount } from '../controller/user.controller.js'
import upload from '../middleware/multer.middleware.js'
const router = express.Router()
router.route('/signup').post(upload.single('avatar') ,createAccount)

export default router