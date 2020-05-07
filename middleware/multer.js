const multer = require("multer");

// static storage
// set up multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/upload');
  },

  filename: (req, file, callback) => {
    callback(
      null,
      Date.now() +
        "-" +
        file.filename +
        "-" +
        Date.now() +
        "." +
        file.originalname.trim().split(".").pop()
    );
  },
});


const fileFilter =(req,file,cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
}

exports.upload = multer(
    { 
    storage: storage ,
    limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter
}
);
