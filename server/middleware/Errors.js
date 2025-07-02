//for handling synchronized errors

exports.generatedErrors = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        message:err.message,
        errName:err.name,
        // stack:err.stack
    });
};

