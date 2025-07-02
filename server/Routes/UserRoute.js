const UserRoutes= require("../Controllers/UserController")
const express = require("express");
const Router= express.Router();



//This is for User  Registration
Router.post("/register",UserRoutes.userRegister);
Router.post("/login",UserRoutes.userLogin);

module.exports= Router;