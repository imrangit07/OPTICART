const { catchAsyncErrors } = require("../middleware/catchAsynError");
const UserModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler");
const ProductModel = require("../Models/productModel")

const userRegister = catchAsyncErrors(async (req, res) => {
    console.log(req.body);
    const userData = new UserModel(req.body);
    await userData.save();

    res.status(201).send("register successfully");

})


//This is for UserLogin
const userLogin = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.findOne({ userEmail: req.body.userEmail }).select("+userPassword").exec();
    console.log("user : ", user);

    if (!user) {
        return next(new ErrorHandler("User not found With This Email Address!", 404));
    }

    const isMatch = await user.comparePassword(req.body.userPassword);
    console.log("Check : ", isMatch);

    if (!isMatch) {
        return next(new ErrorHandler("password not match!", 401))
    }

    res.status(200).json({ message: "login successfully" });

})

// This is for show all product data
const getAllProducts = catchAsyncErrors(async (req, res) => {

    const allProducts = await ProductModel.find();
    console.log("hellow");

    console.log(allProducts);

    res.status(200).json({
        success: true,
        message: 'Product Get successfully',
        product: allProducts
    });

});
module.exports = {
    userRegister,
    userLogin,
    getAllProducts
};
