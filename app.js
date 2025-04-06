import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongo.config.js";
import wordListPath from "word-list";
import Trie from "./src/core/Trie.js";
import WordController from "./src/controller/word.controller.js";
import fs from "fs";

/** Configure the .env file */
dotenv.config();

/** Import the express module */
const app = express();
app.use(cors());
app.use(bodyParser.json());

const wordController = new WordController();

/** Initialize the port */
const PORT = process.env.PORT || 4000;

app.listen(PORT, async (err) => {
  /** Log the server status */
  if (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  } else {
    /** Log the MongoDB connection status */
    await connectDB(process.env.MONGO_URL);

    // Populate the Trie with words from the database
    // const words = fs.readFileSync(wordListPath, "utf8").split("\n");
    // for (let i = 0; i < words.length; i++) {
    //   await wordController.insertWord(words[i]); // limit to 100 words for testing
    // }

    /** Log the server status */
    console.log(`Server is running on port ${PORT}`);
  }
});

app.get("/search", (req, res, err) => {
  wordController.searchWord(req, res, err);
});

app.get("/autocomplete", (req, res, err) => {
  wordController.autocomplete(req, res, err);
});

app.post("/insert", (req, res, err) => {
  wordController.insertWord(req, res, err);
});
