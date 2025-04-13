import mongoose from "mongoose";

// Define the sub-interest schema (recursive)
const subInterestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subInterests: [/* recursion will be set later */]
});

// This is the trick to allow recursive embedding
subInterestSchema.add({ subInterests: [subInterestSchema] });

// Main interest schema
const interestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subInterests: [subInterestSchema],
  createdby: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: "User",
  },
}, { timestamps: true  });

// Create and export model
const Interest = mongoose.model("Interest", interestSchema);
export default Interest;


