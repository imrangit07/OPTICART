const {catchAsyncErrors} = require("../middleware/catchAsynError");

const getOrders = catchAsyncErrors(async(req,res)=>{

    const customerId = req.cookies.userId;
    console.log("custoemr",customerId);

    res.json("okkk");
    
})

module.exports=
{
    getOrders
};