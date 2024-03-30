// const User = require("../models/userModel");

// const createUser = async (req, res) => {
//   try {
//     const { firstname, lastname, email, mobile, password } = req.body;

//     if (!firstname || !lastname || !email || !mobile || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const findUser = await User.findOne({ email: email });

//     if (!findUser) {
//       // Create a new user
//       const newUser = await User.create(req.body);
//       res.json(newUser);
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// module.exports = createUser;

const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    // Check if the email or phone number is already registered
    const existingUser = await User.findOne().or([{ email }, { phoneNumber }]);
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone number already registered' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token for session management
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};