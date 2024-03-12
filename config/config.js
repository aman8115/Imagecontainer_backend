import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose.set('strictQuery',false)
const dataBase_Connection = async()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((connec)=>{
        console.log(`Database has connected ${connec.connection.host}`)
    })
    .catch((e)=>{
        console.log(`Database has not coonected `)
        process.exit(1)
    })

}
export default dataBase_Connection