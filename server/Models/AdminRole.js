// Models/AdminModel.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: [true, "User id Required"]
  },
  adminPassword: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["admin", "finance", "order"], 
    default: "admin"
  }
});

module.exports = mongoose.model("Role", RoleSchema);
