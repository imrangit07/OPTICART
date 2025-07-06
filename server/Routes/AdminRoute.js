const AdminRoutes = require("../Controllers/AdminController");
const VerifyAdmin = require("../middleware/VerifyAdmin")
// const { uploadArray, uploadImage } = require("../middleware/imageUpload");
const upload = require("../middleware/multer")
const catchAsyncErrors = require("../middleware/catchAsynError")

const express = require("express");
const Router = express.Router();

const {uploadMultiple,uploadImage} = require("../middleware/imageUpload")

Router.post("/login", AdminRoutes.adminLogin);


Router.post('/addproduct', uploadMultiple, uploadImage, AdminRoutes.AddNewProducts);
Router.get('/getAllProduct', AdminRoutes.getAllProducts);
Router.get('/delete', AdminRoutes.deleteProduct);
Router.get('/edit', AdminRoutes.editProduct);

module.exports = Router;