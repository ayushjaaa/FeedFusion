import jwt from 'jsonwebtoken'
import config from '../src/config/config.js'
export const authmidelware = async(req,res,next) =>{
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
        console.log("Access Token: ", accessToken);
        
        
        if (!accessToken) {
            console.log("Token is missing!");
            return res.status(400).json({ message: "Access token is required" });
        }

       
        const decoded = jwt.verify(accessToken, config.JWT_access_SECRET);
        console.log("Decoded Token: ", decoded); 

       
        req.user = decoded;
        console.log(decoded);
    
        // console.log("User authenticated, moving to next middleware.");
        next();  
    } catch (error) {
        // console.log("Token verification error: ", error.message); 
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}