const mongoose = require('mongoose');
require ('dotenv').config();
exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.BACKENDAPI);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error.message);
    }
}

