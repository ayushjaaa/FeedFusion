import mongoose from "mongoose";
const interestSchema = new mongoose.Schema({
    name:{
        type:String
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:""
    },
    createdby: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Interest = mongoose.model("Interest",interestSchema)
export default Interest