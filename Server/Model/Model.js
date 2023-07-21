import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    isadmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      //    ,unique:true
    },
    phone: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

export default User;
