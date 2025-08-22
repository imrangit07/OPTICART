const UserRoutes= require("../Controllers/UserController")
const express = require("express");
const Router= express.Router();

const {isAuthenticated} = require("../middleware/Auth")



//This is for User  Registration
Router.post("/current",isAuthenticated,UserRoutes.currentUser);
Router.post("/register",UserRoutes.userRegister);
Router.post("/login",UserRoutes.userLogin);
Router.post("/logout",UserRoutes.userLogout);
Router.get('/getAllProduct', UserRoutes.getAllProducts);
Router.post('/userinfo', UserRoutes.userInfo);

Router.get("/currentuserinfo",UserRoutes.CurrentUserInfo)
Router.post('/placeorder', UserRoutes.placeOrder);


module.exports= Router;