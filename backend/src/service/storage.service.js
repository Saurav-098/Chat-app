const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (filepath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filepath);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return uploadResult.secure_url;

  } catch (error) {
    console.log("🔥 CLOUDINARY ERROR:", error);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    throw error;
  }
};

module.exports = uploadOnCloudinary;