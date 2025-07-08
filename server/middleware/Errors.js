exports.generatedErrors = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    // Combine all Mongoose validation messages
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Duplicate key error 
  if (err.code === 11000 && err.name === "MongoServerError") {
    statusCode = 400;
    message = "Duplicate key error. For example, SKU must be unique.";
  }

  res.status(statusCode).send({
    success: false,
    message: message,
    errName: err.name,
    // stack: err.stack, // uncomment in dev if needed
  });
};
