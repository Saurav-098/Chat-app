const mongoose = require('mongoose')


const messgeSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    reciver: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    message: {
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    }

},{timestamps:true})


const messageModel = mongoose.model("message",messgeSchema)

module.exports = messageModel;