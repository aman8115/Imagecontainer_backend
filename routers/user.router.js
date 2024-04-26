import express  from 'express'
import { LogIn, Logout, createAccount, getProfile ,deleteAccount} from '../controller/user.controller.js'
import upload from '../middleware/multer.middleware.js'
import { isLogin } from '../middleware/JWTauth.js'
isLogin
const router = express.Router()
router.route('/signup').post(upload.single('avatar') ,createAccount)
router.route('/login').post(LogIn)
router.route('/profile').get(isLogin,getProfile)
router.route('/logout').get(Logout)
router.route('/delete').delete(isLogin,deleteAccount)

export default router