import app from './app.js'
import { config } from 'dotenv'
config()
const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT,()=>{
    console.log(`server is wroking at http://localhost${PORT}` )
})