require("dotenv").config();
const jwt = require('jsonwebtoken');

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({err:"token invalid"});
    }
    try {
        
    const string=jwt.verify(token,process.env.SECRET_KEY)
    req.user=string.user;
    next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send({err:"token invalid"});
    }
};

module.exports={fetchUser};