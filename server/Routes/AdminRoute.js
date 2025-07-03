const AdminRoutes = require("../Controllers/AdminController");
const VerifyAdmin = require("../middleware/VerifyAdmin")
// const { uploadArray, uploadImage } = require("../middleware/imageUpload");
const upload = require("../middleware/multer")
const catchAsyncErrors = require("../middleware/catchAsynError")

const express = require("express");
const Router = express.Router();

const {uploadMultiple,uploadImage} = require("../middleware/imageUpload")

Router.post("/login", AdminRoutes.adminLogin);

// Router.post('/addproduct', upload.array('image', 10), (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).send('No files were uploaded.');
//     }

//     const fileUrls = req.files.map(file => ({
//       filename: file.filename,
//       path: file.path,
//       size: file.size
//     }));

//     res.status(200).json({
//       message: 'Files uploaded successfully!',
//       files: fileUrls
//     });
//   } catch (error) {
//     console.error('Error uploading files:', error);
//     res.status(500).send('Error uploading files');
//   }
// });
Router.post('/addproduct', uploadMultiple, uploadImage, AdminRoutes.AddNewProducts);

module.exports = Router;