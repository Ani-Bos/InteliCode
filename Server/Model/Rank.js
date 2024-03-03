import mongoose from "mongoose";
const RankSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem_id: {
      type: String,
      required: true,
     },
    language_id: {
            type: String,
            required:true,
    },
    codes_submitted: {
        type: String,
        required:true,
    },
  },
  { timestamps: true }
);

const Rank = mongoose.model("Rank", RankSchema);
export default Rank;
