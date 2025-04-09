export const loginUser = async(req,res)=>{
 const ALLOWED_ROLES = ["user", "admin"];
const {email,password,role} = req.body
const normalizedRole = role.toLowerCase();
if(!ALLOWED_ROLES.includes(role)){
    return res.status(403).json({message:"roel is not allwoed"})

}


}