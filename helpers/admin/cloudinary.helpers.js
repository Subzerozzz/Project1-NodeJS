const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// Configuration
cloudinary.config({
  cloud_name: "dodyg1m75",
  api_key: "551994136416369",
  api_secret: process.env.API_SECRET,
});

module.exports.storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NODEJS",
  },
});
