
const express = require("express");
const Router = express.Router();

const OrderRoute = require('../Controllers/OrdersController');

// Router.get("orderdetail",OrderRoute.getOrders)
//This is for User
Router.get("/myorders",OrderRoute.getMyOrders);

//This is for Adim
Router.get("/allorders",OrderRoute.getAllOrders);

Router.get("/view",OrderRoute.getOneOrder);
Router.put("/updateStatus",OrderRoute.updateOrderStatus);






module.exports= Router;