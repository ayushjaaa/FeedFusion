import mongoose from "mongoose";


const subInterestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subInterests: [{type: mongoose.Schema.Types.ObjectId}]
});


subInterestSchema.add({ subInterests: [subInterestSchema] });


const interestSchema = new mongoose.Schema({
  name: { type: String, required: true },

  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
parrentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Intrest'
}
}, { timestamps: true  });


const Interest = mongoose.model("Interest", interestSchema);
export default Interest;



