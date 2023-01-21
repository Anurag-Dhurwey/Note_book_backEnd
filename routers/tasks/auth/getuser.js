const User=require("../../../config/models/M.user");
const getuser=async(req, res) => {

  
    try {
       let userId=req.user.id;
       const user=await User.findById(userId).select("-password");
       res.status(201).send(user)
      
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: error.message});
      }
    
    };
  
  
    module.exports={getuser};