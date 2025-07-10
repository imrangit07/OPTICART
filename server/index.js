const express = require("express");
const app =express();
require('./Models/Database').connectDatabase();
const adminRoutes = require("./Routes/AdminRoute");

const userRoutes = require("./Routes/UserRoute");

const orderRoutes = require("./Routes/OrdersRoute");

const ErrorHandler = require("./Utils/ErrorHandler");
const {generatedErrors} = require("./middleware/Errors");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require("cookie-parser");


const cors = require("cors");

const port =process.env.PORT;


// app.use(cookieParser());

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session and cookie
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET
}))

//Cookie
app.use(cookieParser());

app.use(
  cors({
  origin: 'http://localhost:5173',   
  credentials: true                  
})
);


//Admin Routes
app.use("/admin",adminRoutes);

//User Routes
app.use("/user",userRoutes);

//User Order
app.use("/product",orderRoutes)


//Handle syn. error
app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`URL ${req.url} Not Found!`, 404))
})
app.use(generatedErrors)

//Listen to the port
app.listen(port,()=>{
    console.log(`Servier is Runnin on Port ${port}`);
})