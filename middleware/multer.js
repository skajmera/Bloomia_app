const multer=require('multer');
const path=require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads')
    },
    filename:(req,file,cb)=>{
        // console.log(file);
        cb(null,Date.now() + file.originalname)
    }
})
const upload=multer({storage:storage})
module.exports=upload;