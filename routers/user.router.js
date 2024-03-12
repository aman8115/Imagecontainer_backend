import express  from 'express'
import { createAccount } from '../controller/user.controller.js'
const router = express.Router()
router.route('/signup').post(createAccount)

export default router