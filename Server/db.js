import  mongoose  from "mongoose";
const url = "mongodb://localhost:27017/mt45";

const mongoconnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default mongoconnect;