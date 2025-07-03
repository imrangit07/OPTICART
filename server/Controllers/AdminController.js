const { catchAsyncErrors } = require("../middleware/catchAsynError");
const AdminModel = require("../Models/AdminModel");
const ProductModel = require("../Models/productModel");


const jwt = require("jsonwebtoken");

const adminLogin = catchAsyncErrors(async (req, res) => {
  const { adminId, adminPassword } = req.body;

  const adminData = await AdminModel.findOne({ adminId });

  if (!adminData) {
    return res.status(404).json({ message: "Admin not found" });
  }

  if (adminData.adminPassword !== adminPassword) {
    return res.status(400).json({ message: "Admin password is wrong" });
  }


  const token = jwt.sign(
    { adminId: adminData._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );


  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Admin logged in successfully", adminData });


});

const AddNewProducts = (req, res) => {

  console.log(req.body);
  console.log( req.uploadedFiles);
  
  res.status(200).json({
    success: true,
    message: 'Files uploaded successfully',
    data: req.uploadedFiles
  });
}



module.exports = {
  adminLogin,
  AddNewProducts
};
