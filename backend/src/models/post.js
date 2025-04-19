


const mongoose = require("mongoose");

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
  }
});

module.exports = mongoose.model("Post", postSchema);







//   const post = await Post.create({
//     title,
//     content,
//     createdBy: req.user._id,
//     interests
//   });
  
  