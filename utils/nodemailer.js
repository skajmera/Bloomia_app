const nodeMailer=require('nodemailer');
const transPorter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"subhashajmera2@gmail.com",
        pass:""
    }
});

exports.myFunction = (data) => {
    // console.log(data);
    // do something
    transPorter.sendMail(data,(err,info)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("email sent : " + info.response);
        }
    })
}