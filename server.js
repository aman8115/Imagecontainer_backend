import app from './app.js'
import { config } from 'dotenv'
config()
import cloudinary from 'cloudinary'
const PORT = process.env.PORT
// cloudinary config
console.log(process.env.CLOUD_NAME)
console.log(process.env.SECRET_KEY)
console.log(process.env.API_KEY)
cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.SECRET_KEY
})
app.listen(PORT,()=>{
    console.log(`server is wroking at http://localhost${PORT}` )
})