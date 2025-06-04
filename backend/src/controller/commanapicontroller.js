
import InterestModel from "../models/interest.js";
export const fetchintrest = async(req,res)=>{
  
    try{
    
      const fetchedintrest = await InterestModel.find({})
      console.log(fetchedintrest)

      if(!fetchedintrest){
        return res.status(200).json({
            message: "No interests found",
            data: []
          });          
      }

      res.status(200).json(fetchedintrest);
    }catch(error){
    console.log(error)
    }
    
    }