const mongoose = require("mongoose");

const AdminModel = new mongoose.Schema({
    adminId: {
        type: String,
        require:[true,"User id Required"]
    },
    adminPassword: {
        type: String,
        // select: false
        // minLength: [5,"Admin Id Too Short"],
        // maxLength: [15,"Admin Password Too Long"],
    }
})

module.exports = mongoose.model("admin", AdminModel);