import { createTransport } from 'nodemailer'
import dontenv from 'dotenv'

dontenv.config()

/* send con ethereal */
async function sendMailEthereal(to, subject, html) {
    const ADMIN_MAIL = process.env.ETHEREALMAIL

    const transporter = createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: ADMIN_MAIL,
            pass: process.env.ETHEREALPASS
        }
    })

    const mailOptions = {
        from: "Servidor Node",
        to: to,
        subject: subject,
        html: html,
    }

    try{
        await transporter.sendMail(mailOptions)
    } catch(e){
        console.log(e)
    }
}

export default sendMailEthereal;