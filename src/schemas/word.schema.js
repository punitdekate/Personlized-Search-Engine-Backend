import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
});

const Word = mongoose.model("Word", wordSchema);
export default Word;
