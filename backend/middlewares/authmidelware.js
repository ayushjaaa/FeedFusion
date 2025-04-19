import jwt from 'jsonwebtoken'
import config from '../src/config/config.js'
export const authmidelware = async(req,res) =>{
try{
    const accesstoken  = req.headers.authorization?.split(" ") [1]
    if(!accesstoken){
        return res.status(400).json({message:"accesstoke is required"})
    }
    const decod = jwt.verify(accesstoken,config.JWT_access_SECRET)
   
     req.user = decod
    console.log(req.user)
    next()
}catch(error){
    return res.status(401).json({message:error})
    console.log(error)
}
}