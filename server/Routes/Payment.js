const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const OrderModel = require("../Models/OrdersModel");

require('dotenv').config();



router.post("/orders", async (req, res) => {
    const { cartProduct, address, price, customerId } = req.body;


    try {

        if (!cartProduct || !Array.isArray(cartProduct) || cartProduct.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart products are required and must be an array.'
            });
        }

        if (!address || typeof address !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Address is required.'
            });
        }

        if (!customerId) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated.'
            });
        }

        const items = cartProduct.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const shippingAddress = {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country
        };

        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 5);

        // Prepare Razorpay order options
        const instance = new Razorpay({
            key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_KEY_SECRET,
        });



        const options = {
            amount: price * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        //Create order
        instance.orders.create(options, async (error, orderData) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            //Saving OrderModel

            const OurOrders = await OrderModel.create({
                customerId,
                phoneNumber: address.phoneNumber,
                items,
                totalAmount: price,
                shippingAddress,
                paymentStatus: 'Pending',
                orderStatus: 'Pending',
                deliveryDate: deliveryDate,
                razorpay_order_id: orderData.id
            });


            console.log("Check : ", OurOrders._id);

            res.status(200).json({ data: orderData, orderId: OurOrders._id });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }

});

//Verifying the payment

router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;


        const resultSign = crypto
            .createHmac("sha256", process.env.RZP_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (razorpay_signature === resultSign) {
            const order = await OrderModel.findByIdAndUpdate(
                { _id: orderId },
                {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    paymentStatus: "Paid",
                },
                { new: true }
            );

            return res.status(200).json({
                message: "Payment verified successfully",
                order
            });
        } else {
            return res.status(400).json({ message: "Invalid signature!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;