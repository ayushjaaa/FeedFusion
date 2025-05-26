import mongoose, { Types } from "mongoose";

const postdataStatSchema = new mongoose.Schema(
  {
    userId: {
        type:String,
    },
    numberoflicks:{
        type:Number,
    },
    numberofsaves:{
        Types:Number
    },
    numberofreports:{
        Types:Number
    },
    NumberofPostinyearsameIntrest:{
        type:Number
    },
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      }
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      }
    ]
  },
  {
    timestamps: true 
  }
);

const posttStat = mongoose.model("ProductStat", ProductStatSchema);

export default posttStat;