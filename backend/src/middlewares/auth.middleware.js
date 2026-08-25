const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authMiddleware(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "User unAuthorised please loged in"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id).select("-password")

        req.user = user
        req.userId = decoded.id;

    next()
    } catch (error) {
        return res.status(400).json({
        message: "invalid token"
    })
    }
}


module.exports = authMiddleware