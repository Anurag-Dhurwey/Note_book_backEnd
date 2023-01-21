require("dotenv").config();
const jwt = require('jsonwebtoken');
const User=require("../../../config/models/M.user");
const bcrypt=require("bcrypt");
const { body, validationResult } = require('express-validator');
const login=async(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const {email,password}=req.body;
    const existUser= await User.findOne({email:email});
   if(existUser){
     const checkpass=await bcrypt.compare(password,existUser.password);
     if(checkpass){
        const data={user:{
            id:existUser._id
        }}
        const authToken=jwt.sign(data,process.env.SECRET_KEY);
        return res.json(authToken);
     }
    
   }else{
    return  res.status(400).json({ errors: "this email is already registerd" });
   }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: error.message});
    }
  
  };


  module.exports={login};