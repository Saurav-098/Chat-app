const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
        cors: {
            origin: "http://localhost:5173",
        }
    })
     const userSocketMap = {}

     const getReciverSocketId = (reciver) =>{
        return userSocketMap[reciver]
     }
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId
        if(userId!=undefined){
            userSocketMap[userId] = socket.id
        }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
         io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })    
    })

module.exports = {app,server,io, getReciverSocketId}