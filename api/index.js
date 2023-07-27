const express = require("express");
const dBconnect = require("./db");
const app = express();
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();

//middlewares
app.use(cors({
    origin:"*",
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/users",usersRoute);
app.use("/api/v1/hotels",hotelsRoute);
app.use("/api/v1/rooms",roomsRoute);

app.use((err,req,res,next)=>{
    errorStatus = err.status || 500
    errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    });
})
app.listen(8800,()=>{
    dBconnect();
    console.log("Connected to backend");
})