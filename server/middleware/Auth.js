const jwt = require("jsonwebtoken");

const ErrorHandler = require("../Utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsynError");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("in Auth : ", token);

    if (!token) {
        return next(new ErrorHandler("Please login to access the resource", 401))
    }

    // Check if the token is valid or not
    const { id } = jwt.verify(token, process.env.JWT_SECRET)

    req.id = id; // universaly accessible variable id 

    // res.json({ id, token });
    next();
});