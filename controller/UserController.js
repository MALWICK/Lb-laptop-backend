const User = require("../models/userModel");
const encrypt = require("../utils/bcrypt")
const jwt = require('jsonwebtoken')

const NewUser = async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password } = req.body;
    console.log(req.body);

    if (!firstname || !lastname || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "invalid data , please all feilds is required",
      });
    }

    const findUser = await User.findOne({ email: email });

    if (!findUser) {

      req.body.password = await encrypt.hashPassword(req.body.password)
      console.log(req.body);
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

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      console.log("empty feild");
      return res.json({
        message: "",
        status: false
      })
    }

   await User.findOne({ email: email })
      .then(async  data => {
        console.log(typeof data)
        payload={
          email:data.email,
          id:data.id,
          phoneNumber:data.mobile,
          lastname:data.lastname,
          firstname:data.firstname
        }
        const checkPassword = await encrypt.comparePassword(password, data.password)
        if (checkPassword) {
          
          const token = jwt.sign(payload,process.env.SECRET_KEY, { algorithm: process.env.TOKEN_ALGORITHM })

          const expirationDate = new Date();

          expirationDate.setDate(expirationDate.getDate() + 29);

          try {
            res.cookie("accessToken", token, {
              httpOnly: true,
              secure: true,
              expires: expirationDate,
              sameSite: "None"
            }).json({ message: "Success", status: true })
          }
          catch (err) {
            console.log(err)
          }

        }
        else{
          return res.json({
            message:"invalid userName or password",
            status: false
          })
        }
      }).catch((error) => {
        {
          console.log("ivalid user")
          console.log(error.message);
          console.log(error);
          return res.json({
            message: error.message,
            status: false
          })
        }
      })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }

}

const Logout =(req,res)=>{
  try{
      res.clearCookie("accessToken",{
          secure:true,
          sameSite:"none"
      }).status(200).json({message:"user has been logged out"})

  }
  catch(err){
      res.json({Error:"something went wrong, try again"})
      return res.json({Error:err})
  }

}




module.exports = { LoginUser, NewUser,Logout }