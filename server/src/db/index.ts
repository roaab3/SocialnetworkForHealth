import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDb = async () => {
   await mongoose.connect("mongodb://localhost:27017/parpar-server");

const posts = mongoose.model("posts");
const indexes = await posts.collection.indexes();

};

export { connectDb };
