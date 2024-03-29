const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const authRouter = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
dbConnect()

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/api/user", authRouter);
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});