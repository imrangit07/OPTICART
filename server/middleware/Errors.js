//for handling synchronized errors

exports.generatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // // Mongoose validation error
    // if (err.name === "ValidationError") {
    //     statusCode = 400;
    //     message = Object.values(err.errors).map(val => val.message).join(", ");
    // }

    // // Duplicate key error 
    // if (err.code === 11000 && err.name === "MongoServerError") {
    //     statusCode = 400;
    //     message = `Duplicate key error and uniqe sku`;
    // }

    res.status(statusCode).send({
        message: err.message,
        errName: err.name,
        // stack:err.stack
    });


    
};

