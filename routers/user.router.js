import express  from 'express'
import { createAccount } from '../controller/user.controller.js'
const router = express.Router()
router.get('/me',createAccount)
export default router