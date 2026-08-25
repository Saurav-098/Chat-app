const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const cors = require('cors');
const { app } = require('./socket/socket');



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://chat-app-3fnl.onrender.com",
    credentials: true
}));


app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/message',messageRoutes)


module.exports = app
