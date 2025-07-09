const UserRoutes= require("../Controllers/UserController")
const express = require("express");
const Router= express.Router();

const {isAuthenticated} = require("../middleware/Auth")



//This is for User  Registration
Router.post("/current",isAuthenticated,UserRoutes.currentUser);
Router.post("/register",UserRoutes.userRegister);
Router.post("/login",UserRoutes.userLogin);
Router.post("/logout",isAuthenticated,UserRoutes.userLogout);
Router.get('/getAllProduct', UserRoutes.getAllProducts);


module.exports= Router;