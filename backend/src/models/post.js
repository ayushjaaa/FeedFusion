import mongoose  from "mongoose";
const postSchema = new mongoose.Schema({
    title:String,
    content:String,
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    ,selectedintrest:{type:mongoose.Schema.Types.ObjectId, ref:"adminintrest"}
})
export default mongoose.model("post", postSchema);