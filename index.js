const express = require('express');
const dbConnect = require('./config/dbConnect');
const CookieParser=require('cookie-parser')
const app = express();
const authRouter = require('./routes/authRoutes');
const midlewareAuth=require('./middlewares/authentication')
const dotenv = require('dotenv').config();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
dbConnect()

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(CookieParser())
app.use("/api/user", authRouter);
app.get('/',midlewareAuth.Auth,(req,res)=>{
    res.send({message:"ok",status:true})
})

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});