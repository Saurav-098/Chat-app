const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    },
    image: {
        type:String,
        default: ""
    }
   
},{timestamps:true})


const userModel = mongoose.model('user',userSchema)


module.exports = userModel