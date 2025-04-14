import mongoose  from "mongoose";
const adminintrestSchema = new mongoose.Schema({
adminintrest:{
    type:Object
  
}
    
})
export default mongoose.model("adminintrest", adminintrestSchema);