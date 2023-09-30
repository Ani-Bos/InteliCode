import mongoose from "mongoose";
const { Schema } = mongoose;
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    testcase: {
      type: Array,
      required: true,
    },
    constraint: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("question", schema);
 
export default Question;
