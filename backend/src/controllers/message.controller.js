const conversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");
const uploadOnCloudinary = require("../service/storage.service");
const {io, getReciverSocketId } = require("../socket/socket");

async function sendMessage(req,res){
    try {
        const sender = req.userId
        const {reciver} = req.params
        const {message} = req.body

        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        let conversation = await conversationModel.findOne({
            partcipants:{$all:[sender,reciver]}
        })

        const newMessage = await messageModel.create({
            sender,reciver,message,image
        })

        if(!conversation){
            conversation = await conversationModel.create({
                partcipants:[sender,reciver],
                messages:[newMessage._id]
            })
        }else{
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        const reciverSocketId = getReciverSocketId(reciver)

        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage)
        }

        return res.status(201).json(newMessage)
    } catch (error) {
        console.log("SEND MESSAGE ERROR:", error);

        return res.status(500).json({
            message: `send Message err ${error.message}`
        });    
    }
}

async function getMessages(req,res){
    try {
        const sender = req.userId
        const {reciver} = req.params
        const conversation = await conversationModel.findOne({
            partcipants:{$all:[sender,reciver]}
        }).populate("messages")
        if(!conversation){
            return res.status(400).json({
                message:"conversation not found"
            })
        }

        return res.status(200).json(conversation?.messages)
    } catch (error) {
        return res.status(500).json({
            message: `get Message err ${error}`
        })
    }
}


module.exports = {sendMessage,getMessages}