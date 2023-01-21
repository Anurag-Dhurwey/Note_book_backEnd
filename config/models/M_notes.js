const mongoose =require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  userID:{
    type:mongoose.Schema.Types.ObjectId,
  },
  ref:{
    type:String,
    default:"User"
  },
  title:{
    type:String
  },
  tag:{
   type:String,
   default:"General"
  },
  description:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }

 
});


module.exports=mongoose.model("Note",NotesSchema);