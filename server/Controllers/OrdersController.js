const OrderModel = require("../Models/OrdersModel")
const { catchAsyncErrors } = require("../middleware/catchAsynError");


// This is for User
const getMyOrders = catchAsyncErrors(async (req, res) => {
    const { customerId } = req.query;
    const myorders = await OrderModel.find({ customerId: customerId })
        .populate('customerId')
        .populate('items.productId');

    console.log(myorders);

    res.json(myorders);
})

// This is for Admin
const getAllOrders = catchAsyncErrors(async (req, res) => {
    const allOrders = await OrderModel.find()
        .populate('customerId')
        .populate('items.productId');

        res.json(allOrders)

});

module.exports =
{
    getMyOrders,
    getAllOrders
};