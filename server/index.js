const express = require("express");
const app =express();
require('./Models/Database').connectDatabase();
const adminRoutes = require("./Routes/AdminRoute");

const userRoutes = require("./Routes/UserRoute")

const ErrorHandler = require("./Utils/ErrorHandler")
const {generatedErrors} = require("./middleware/Errors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port =process.env.PORT;


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use("/admin",adminRoutes);
app.use("/user",userRoutes);

app.all("*",(req,res,next)=>{
  next(new ErrorHandler(`URL ${req.url} Not Found!`, 404))
})
app.use(generatedErrors)
app.listen(port,()=>{
    console.log(`Servier is Runnin on Port ${port}`);
})