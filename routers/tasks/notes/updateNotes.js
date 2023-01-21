const Notes=require("../../../config/models/M_notes");

// update_notes 
const updateNotes=async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
    const updated_notes={};
    if(title){
        updated_notes.title=title
    };
    if(description){
        updated_notes.description=description
    };
    if(tag){
        updated_notes.tag=tag
    };
    if(!req.params.id){
        console.log( {error:"bad request params id not found"})
        return res.status(404).json( {error:"bad request"});
    }
    let note=await Notes.findById(req.params.id);
    if(note){
        if(note.userID.toString()===req.user.id){
            const notesData= await Notes.findByIdAndUpdate(req.params.id,{$set:updated_notes},{new:true});
           return res.status(201).json( notesData);
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

module.exports={updateNotes};