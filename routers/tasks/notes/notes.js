const Notes=require("../../../config/models/M_notes");

// notes 
const notes=async(req,res)=>{
  try {
    const notes=await Notes.find({userID:req.user.id});
  res.status(201).json(notes);
  } catch (error) {
    console.log(error.message)
    res.status(401).json({error:error.message})
  }
};

// postnotes 
const postNotes=async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
    const notes=new Notes({
        userID:req.user.id,
        title:title,
        description:description,
        tag:tag
    });

    const notesData= await notes.save();
    res.json(notesData)
    } catch (error) {
        console.log(error.message)
        res.status(401).json({error:error.message})
    }

};

module.exports={notes,postNotes};