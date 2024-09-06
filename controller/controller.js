const suggestionSechema=require('../models/models');

const getsuggestion=async(req,res)=>{
    try{
        const data=await suggestionSechema.find();
        res.json(data);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

const suggestionssend= async (req, res) => {
    const { title, description } = req.body;
  
    try {
      if (!title || !description) {
        return res.status(400).json({
          code: 'VALIDATION_ERROR',
          message: 'Please provide title and description',
        });
      }
  
      const date=new Date();
    const final = date.toLocaleDateString();
      const newEvent = suggestionSechema({ title, description, date:final});
      await newEvent.save();
  
      res.status(201).json(newEvent);
    } catch (err) {
      console.error(err); // log the error
      res.status(400).json({
        code: 'INTERNAL_ERROR',
        message: 'Error creating event',
        details: err.message,
      });
    }
  };
const suggestionupdate=async(req,res)=>{
    const {id}=req.params;
    const {title,description,date}=req.body;
    try{
        if(!title&&!description){
            return res.status(400).json({message:'Please provide title and description'});
        }
        const updatedEvent=await suggestionSechema.findByIdAndUpdate(id,{title,description},{new:true});
        if(!updatedEvent){
            return res.status(404).json({message:'Suggestion not found'});
        };
         res.json({
            status:200,
            message:'Suggestion updated successfully',
         });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

const suggestiondelete=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedEvent=await suggestionSechema.findByIdAndDelete(id);
        if(!deletedEvent){
            return res.status(404).json({message:'Suggestion not found'});
        }
        res.json({
            status:200,
            message:'Suggestion deleted successfully',
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
 };

module.exports={getsuggestion ,suggestionssend,suggestionupdate,suggestiondelete}; 