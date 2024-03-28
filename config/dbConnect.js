const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connecting to MongoDB successfully");
  } catch (error) {
    console.log(error, "Couldn't connect to MongoDB");
  }
};

module.exports = dbConnect;