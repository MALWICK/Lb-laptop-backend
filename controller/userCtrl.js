const User = require("../models/userModel");

const createUser = async (req,res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new user
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        msg:"User already exists"
        success:false
        //user already exists
    }
}