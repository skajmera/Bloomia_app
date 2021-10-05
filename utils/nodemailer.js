const nodeMailer=require('nodemailer');
require('dotenv').config();
const transPorter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.email,
        pass:process.env.password
    }
});

exports.myFunction = (data) => {
    transPorter.sendMail(data,(err,info)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("email sent : " + info.response);
        }
    })
}