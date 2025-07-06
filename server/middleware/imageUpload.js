const { uploadMultiple } = require("./multer");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs");
const ErrorHandler = require("../Utils/ErrorHandler");

const uploadImage = async (req, res, next) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "Glasses-Images");
    const files = req.files;
//  console.log("imageUpload",files);
 
    if (!files || !Array.isArray(files)) {
      return next(new ErrorHandler("No files uploaded", 400));
    }

    const uploadResults = [];
    
    // Process files in parallel for better performance
    await Promise.all(files.map(async (file) => {
      try {
        const result = await uploader(file.path);
        uploadResults.push({
          url: result.secure_url,
          public_id: result.public_id
        });
        fs.unlinkSync(file.path); // Remove file from local storage
      } catch (error) {
        console.error(`Error uploading ${file.originalname}:`, error);
        uploadResults.push({
          error: true,
          fileName: file.originalname,
          message: error.message
        });
      }
    }));

    req.uploadedFiles = uploadResults; // Attach results to request object
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  uploadImage,
  uploadMultiple
};