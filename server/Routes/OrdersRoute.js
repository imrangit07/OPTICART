
const express = require("express");
const Router = express.Router();

const OrderRoute = require('../Controllers/OrdersController');

// Router.get("orderdetail",OrderRoute.getOrders)
Router.get("/myorders",OrderRoute.getMyOrders)


module.exports= Router;