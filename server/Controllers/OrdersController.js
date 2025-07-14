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

const getOneOrder = catchAsyncErrors(async (req, res) => {
    const order = await OrderModel.findById({ _id: req.query.id }).populate('customerId').populate('items.productId');
    console.log(order);
    res.json(order);

})

const updateOrderStatus = catchAsyncErrors(async (req, res) => {
    console.log(req.body.orderStatus);
    
    const updateOrder = await OrderModel.findByIdAndUpdate(req.query.id, { orderStatus: req.body.orderStatus });
    console.log(updateOrder);
    res.json({
        message:"success",
        updateOrder:updateOrder
    })
    
})

module.exports =
{
    getMyOrders,
    getAllOrders,
    getOneOrder,
    updateOrderStatus
};