
const express = require("express");
const Router = express.Router();

const OrderRoute = require('../Controllers/OrdersController');

Router.get("orderdetail",OrderRoute.getOrders)


module.exports= Router;