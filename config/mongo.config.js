import mongoose from "mongoose";

const connectDB = async (mongo_url) => {
  try {
    mongoose
      .connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected database successfully."));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
