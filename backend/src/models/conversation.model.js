const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    partcipants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"message"
        }
    ]
},{timestamps:true})



const conversationModel = mongoose.model("conversation",conversationSchema)

module.exports = conversationModel