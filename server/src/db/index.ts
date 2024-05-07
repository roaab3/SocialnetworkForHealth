import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDb = async () => {

  
   await mongoose.connect(
     "mongodb+srv://rooaabader:roaa123@test.mhcedhf.mongodb.net/?retryWrites=true&w=majority&appName=test"
   );

};

export { connectDb };
