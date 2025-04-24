


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
  createdAt: {
    type: Date,
    default: Date.now
  },
  likeCount:{
    type:Number,
    default:0,
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
  
  