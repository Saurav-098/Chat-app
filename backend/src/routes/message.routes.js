const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const messageController = require('../controllers/message.controller')
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/send/:reciver',authMiddleware,upload.single("image"),messageController.sendMessage)
router.get('/get/:reciver',authMiddleware,messageController.getMessages)




module.exports = router