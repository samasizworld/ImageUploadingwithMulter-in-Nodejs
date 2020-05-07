const express = require('express');
const router = express.Router();
const Profile =require('../../models/Multer');
const multer = require("multer");

// static storage
// set up multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },

  filename: (req, file, callback) => {
    callback(
      null,
      Date.now() +
        "--" +
        file.originalname
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

const upload = multer(
    { 
    storage: storage ,
    limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter
}
);


router.post('/',upload.single('profileImage'), async (req,res)=>{
console.log(req.file)
try {
    const profile = new Profile({
        profileImage:req.file.path,
        name:req.body.name
    });

    await  profile.save();
    res.json(profile);
    
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')

}});


router.get('/', async (req,res)=>{
  try {
    const profile = await Profile.find().select('profileImage');
    res.json(profile)
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
    
  }
})

module.exports = router;

