const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;

    if (!firstname || !lastname || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      // Create a new user
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = createUser;