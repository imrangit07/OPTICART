const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  
    phoneNumber:{
        type:Number
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
}, { timestamps: true });



module.exports = mongoose.model('userinfo', addressSchema);
