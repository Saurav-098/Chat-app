const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/multer');

const router = express.Router();

router.get("/current",authMiddleware,userController.getCurrentUser)
router.get("/others",authMiddleware,userController.getOtherUser)
router.put("/profile",authMiddleware,upload.single("image"),userController.editProfile)
router.get("/search",authMiddleware,userController.search)


module.exports  = router