const AdminRoutes = require("../Controllers/AdminController");
const VerifyAdmin = require("../middleware/VerifyAdmin")
const express = require("express");
const Router= express.Router();


Router.post("/login",AdminRoutes.adminLogin);


module.exports= Router;