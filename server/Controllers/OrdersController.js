const OrderModel = require("../Models/OrdersModel")
const { catchAsyncErrors } = require("../middleware/catchAsynError");

const getMyOrders = catchAsyncErrors(async (req, res) => {
    const { customerId } = req.query;
    const myorders = await OrderModel.find({ customerId: customerId })
    .populate('customerId')
    .populate('items.productId');

    console.log(myorders);

    res.json(myorders);

})

module.exports =
{
    getMyOrders
};