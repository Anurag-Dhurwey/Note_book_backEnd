require("dotenv").config();
const User=require("../../../config/models/M.user");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
const { body, validationResult } = require('express-validator');
const register=async(req, res) => {
let success=true
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success=false
    return res.status(400).json({success, errors: errors.array() });
  }

  try {
    const {name,email,password,confirmpassword}=req.body;
    if(password===confirmpassword){
      
    const existUser= await User.findOne({email:email});
    if(existUser){
      success=false
     return  res.status(400).json({success, errors: "this email is already registerd" });
    }
    const hassPassword=await bcrypt.hash(password,10);
     const user=new User({
            name:name,
            email:email,
            password:hassPassword
     })
       const userData=await user.save();
       const data={
         user:{
           id:user._id
         }
       }
       const authToken=jwt.sign(data,process.env.SECRET_KEY);
       return res.json({success,authToken})
    }else{
      success=false
      return res.json({success,'res':'password and confirm password should be same'})
    }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: error.message});
    }
  
  };


  module.exports={register};