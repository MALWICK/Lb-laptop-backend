const jwt =require('jsonwebtoken')
const User= require('../models/userModel')
const Auth= async (req,res,next)=>{
    console.log(req.cookies);


    if(req.cookies.accessToken){
        let token=req.cookies.accessToken
        jwt.verify(token,process.env.SECRET_KEY, async (err)=>{
            if(err) {
                return res.json({Error:"token is invalid"})
            }
           let data= await User.findOne({id:token._id})

            req.userInfo=data
            next()
        })
    }
    else{
        res.json({
            message:"not authentify",
            status:false
        })
    }
}

module.exports={
    Auth
}