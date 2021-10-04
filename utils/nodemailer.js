const nodeMailer=require('nodemailer');
const transPorter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"subhashajmera2@gmail.com",
        pass:"s5@9009120899"
    }
});

exports.myFunction = (data) => {
    console.log(data);
    // Do Something
    transPorter.sendMail(data,(err,info)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("email sent : " + info.response);
        }
    })
}