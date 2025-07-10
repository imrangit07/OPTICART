const {isAuthenticated} = require("../middleware/Auth")

const express = require("express");
const Router = express.Router();

const OrderRoute = require('../Controllers/OrdersController');

Router.get("/orderdetail",isAuthenticated,OrderRoute.getOrders)


module.exports= Router;