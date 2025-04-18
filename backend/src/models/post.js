// import mongoose  from "mongoose";
// const postSchema = new mongoose.Schema({
//     title:String,
//     content:String,
//     createdby:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"user"
//     }
//     ,selectedintrest:{type:mongoose.Schema.Types.ObjectId, ref:"adminintrest"}
// })
// export default mongoose.model("post", postSchema);




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





// {
//     "title": "Best UI Libraries 2025",
//     "content": "Tailwind, Chakra UI, Material UI",
//     "interests": [
//       {
//         "interestId": "660aa111",          // Design
//         "subInterestIds": ["660bb224", "660bb225"]  // UI, UX
//       },
//       {
//         "interestId": "660aa112",          // Frontend
//         "subInterestIds": ["660bb226"]     // React
//       }
//     ]
//   }






//   const post = await Post.create({
//     title,
//     content,
//     createdBy: req.user._id,
//     interests
//   });
  
  