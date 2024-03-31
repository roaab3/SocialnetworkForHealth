import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDb = async () => {
   await mongoose.connect("mongodb://localhost:27017/parpar-server");
//   await mongoose.connect(
//     "mongodb+srv://Tareez:ghandour@test.dey18uy.mongodb.net/?retryWrites=true&w=majority"
//   );

const posts = mongoose.model("posts");
const indexes = await posts.collection.indexes();

};

export { connectDb };
