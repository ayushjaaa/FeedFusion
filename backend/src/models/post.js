import mongoose  from "mongoose";
const postSchema = new mongoose.Schema({
    title:String,
    contet:String,
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    ,selectedintrest:[{type:mongoose.Schema.ObjectId,ref:'Interest'}]
})
export default mongoose.model("post", postSchema);