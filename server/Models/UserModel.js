const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const validateEmail = function (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return re.test(email);
};

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validateEmail,
            message: 'Please enter a valid email address'
        }
    },
    // userPincode: {
    //     type: Number,
    //     required: [true, "Pincode is required"],
    //     validate: {
    //         validator: function (v) {
    //             return /^\d{6}$/.test(v.toString()); 
    //         },
    //         message: 'Pincode must be 6 digits'
    //     }
    // },
    // userAddress: {
    //     type: String,
    //     required: [true, "Address is required"],
    //     trim: true
    // },
    userPassword: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"], 
        maxlength: [20, "Password too long"], 
        select: false
    }
}, { timestamps: true }); 

// Password hashing middleware
UserSchema.pre("save", async function (next) {
    if (!this.isModified('userPassword')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (userpassword) {
    return await bcrypt.compare(userpassword, this.userPassword);
};

module.exports = mongoose.model("User", UserSchema);