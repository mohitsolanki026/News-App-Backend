const express = require('express')
const dotenv = require("dotenv");
const authRouter = require('./routers/authRouter');
const postRouter = require("./routers/postRouter");
const userRouter = require('./routers/userRouter');
const dbconnect = require('./dbConnect')
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

dotenv.config("./.env");

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = express()

//middlewares
app.use(express.json({limit: '10mb'}));
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use("/auth",authRouter)
app.use("/post",postRouter)
app.use("/user",userRouter)

dbconnect()
app.listen(4000, ()=>{
    console.log("hii")
});
