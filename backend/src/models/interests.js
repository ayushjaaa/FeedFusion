import mongoose from "mongoose";


const subInterestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subInterests: [{type: mongoose.Schema.Types.ObjectId}]
});


subInterestSchema.add({ subInterests: [subInterestSchema] });


const interestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subInterests: [subInterestSchema],
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Use r",
  },
}, { timestamps: true  });

// Create and export model
const Interest = mongoose.model("Interest", interestSchema);
export default Interest;



