const Notes=require("../../../config/models/M_notes");

// delete_notes 
const deleteNotes=async(req,res)=>{
    try {
    if(!req.params.id){
        console.log( {error:"bad request params id not found"})
        return res.status(404).json( {error:"bad request"});
    }
    let note=await Notes.findById(req.params.id);
    if(note){
        if(note.userID.toString()===req.user.id){
            const notesData= await Notes.findByIdAndDelete(req.params.id);
           return res.status(201).json({ note:"Deleted successfully"});
        }else{
            console.log( {error:"bad request"})
            return res.status(404).json( {error:"bad request"});
        }
    }else{
        console.log( {error:"data not found"})
        return res.status(401).json( {error:"data not found"});
    }
    } catch (error) {
        console.log(error.message)
        res.status(401).json({error:error.message})
    }

};

module.exports={deleteNotes};