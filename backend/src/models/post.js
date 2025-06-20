


import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  interests: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interest",
        required: true
      
    }
  ],
  likeCount:{
    type:Number, 
    default:0,
  },
  svaecount:{
    type:Number,
    default:0,
  },
createdAt: {
  type: Date,          // ISODate jaisa date field
  default: Date.now    // agar value na de to current time set ho jayega
}
});

const Post = mongoose.model("Post", postSchema);
export default Post






//   const post = await Post.create({
//     title,
//     content,
//     createdBy: req.user._id,
//     interests
//   });
  
  