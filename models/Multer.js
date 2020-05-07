const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    profileImage:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


module.exports=mongoose.model('Profile',ProfileSchema);


