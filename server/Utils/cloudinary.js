const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.uploads = (file, folder) => {
  return cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: folder
  });
};
