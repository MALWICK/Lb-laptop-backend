const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const authRouter = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
dbConnect()
const authMiddleware = require("./middlewares/authMiddleware");


app.use(express.json());

app.use("/api/user", authRouter);
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/protected-route', authMiddleware, (req, res) => {
    // Access the userId from req.userId
    // Perform actions that require authentication
  });