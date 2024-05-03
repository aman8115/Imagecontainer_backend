import nodemailer from 'nodemailer'
import { config } from 'dotenv'
config()


const sendMail = async(email,subject,message)=>{
    let transpoter = nodemailer.createTransport({
        host:process.env.MAIL_TRAP_HOST,
        port:process.env.MAIL_TRAP_PORT,
        secure:false,
        auth:{
            user:process.env.USER_NAME_MAILTRAP,
            pass:process.env.MAIL_TRAP_PASSWORD 
        }

    })
    await transpoter.sendMail({
        from:process.env.MAIL_SENDER_EMAIL,
        to:email,
        subject:subject,
        html:message
    })
}
export {
    sendMail
}