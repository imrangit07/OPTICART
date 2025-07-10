const { catchAsyncErrors } = require("../middleware/catchAsynError");
const UserModel = require("../Models/UserModel");
const OrderModel = require("../Models/OrdersModel");
const UserInfoModel = require("../Models/UsersInfo")

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../Utils/ErrorHandler");
const ProductModel = require("../Models/productModel");
const { sendtoken } = require("../Utils/SendToken");


const userRegister = catchAsyncErrors(async (req, res) => {
  // console.log(req.body);
  const user = new UserModel(req.body);
  await user.save();

  sendtoken(user, 201, res);
  // res.status(201).send("register successfully");
})


//This is for UserLogin
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.findOne({ userEmail: req.body.userEmail }).select("+userPassword").exec();
  console.log("user : ", user);

  if (!user) {
    return next(new ErrorHandler("User not found With This Email Address!", 404));
  }

  const isMatch = await user.comparePassword(req.body.userPassword);
  // console.log("Check : ", isMatch);

  if (!isMatch) {
    return next(new ErrorHandler("password not match!", 401))
  }
  sendtoken(user, 201, res);
  // res.status(200).json({ message: "login successfully" });

})

const userLogout = catchAsyncErrors(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully Logout" });
})

// This is for Current User

const currentUser = catchAsyncErrors(async (req, res) => {
  const user = await UserModel.findById(req.id).exec();
  // console.log("req.id: ", req.id);

  // console.log("current User : ", user);

  res.json({ user });
})

// This is for show all product data
const getAllProducts = catchAsyncErrors(async (req, res) => {

  const allProducts = await ProductModel.find();
  // console.log("hellow");

  // console.log(allProducts);

  res.status(200).json({
    success: true,
    message: 'Product Get successfully',
    product: allProducts
  });

});

// This is for User Address 
const userInfo = catchAsyncErrors(async (req, res) => {
  // console.log(req.body);
  const { customerId, phoneNumber, street, city, state, zipCode, country } = req.body;
  //  const  = req.cookies.userId;

  console.log('only info ', customerId);


  const shippingAddress = {
    street: street,
    city: city,
    state: state,
    zipCode: zipCode,
    country: country
  };

  const userAddress = new UserInfoModel({
    customerId,
    phoneNumber,
    shippingAddress
  });

  await userAddress.save();

  res.status(201).json({
    success: true,
    message: 'Save Info successfully',
  });
})

const CurrentUserInfo = catchAsyncErrors(async (req, res) => {
  const { customerId } = req.query;

  // console.log("currentUserInfo ; ", customerId);


  const UserInfo = await UserInfoModel.findOne({ customerId: customerId });

  console.log("User Info get:", UserInfo);
 if (!UserInfo) {
  return res.status(404).json({
    success: false,
    message: 'User info not found',
    UserInfo: UserInfo
  });
}
 
  res.status(201).json({
    success: true,
    message: 'Successfully fetched user info',
    UserInfo: UserInfo
  });
});


// This is for add Shipping Address
const placeOrder = catchAsyncErrors(async (req, res) => {
  console.log(req.body);

  const { cartProduct, address, price,customerId} = req.body;

  if (!cartProduct || !Array.isArray(cartProduct) || cartProduct.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Cart products are required and must be an array.'
    });
  }

  if (!address || typeof address !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Address is required.'
    });
  }

  if (!customerId) {
    return res.status(401).json({
      success: false,
      message: 'User not authenticated.'
    });
  }

  const items = cartProduct.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price
  }));

  const shippingAddress = {
    street: address.street,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    country: address.country
  };

  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + 5);

  const order = new OrderModel({
    customerId,
    phoneNumber: address.phoneNumber,
    items,
    totalAmount: price,
    shippingAddress,
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    deliveryDate: deliveryDate
  });

  await order.save();

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order: order
  });
});




module.exports = {
  userRegister,
  userLogin,
  getAllProducts,
  userLogout,
  currentUser,
  userInfo,
  CurrentUserInfo,
  placeOrder
};
