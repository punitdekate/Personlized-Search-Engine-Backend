import { count } from "console";
import Trie from "../core/Trie.js";
import WordRepository from "../repository/word.repository.js";
import loadWordsIntoTrie from "../utility/loadwords.utility.js";
import logger from "../utility/logger.utility.js";

export default class WordController {
  constructor() {
    this.wordRepository = new WordRepository();
    this.trie = new Trie();
    loadWordsIntoTrie(this.trie)
      .then(() => {
        console.log("Trie populated with words from the database");
      })
      .catch((error) => {
        logger.info(`Error populating trie: ${error}`);
      });
  }

  async insertWord(req, res, err) {
    try {
      const word = req.body.word;
      if (!word) {
        res.status(400).send("Word parameter is required");
        return;
      }
      await this.wordRepository.insertWord(word);
      this.trie.insert(word);
      res
        .status(200)
        .send({ message: "Word inserted successfully", data: word });
    } catch (error) {
      if (error.code === 11000) {
        logger.info(`Word already exists: ${word}`);
        this.trie.insert(word);
      } else {
        logger.error(`Error inserting word: ${error}`);
        throw error;
      }
    }
  }

  async searchWord(req, res, err) {
    const word = req.query.word;
    if (!word) {
      res.status(400).send("Word parameter is required");
      return;
    }
    let exists = this.trie.search(word);
    res.status(200).send({ word, exists });
  }

  async startsWith(prefix) {
    return this.trie.startsWith(prefix);
  }

  async autocomplete(req, res, err) {
    let prefix = req.query.prefix;
    if (!prefix) {
      res.status(400).send("Prefix parameter is required");
      return;
    }
    let words = this.trie.autoComplete(prefix);
    res.status(200).send({ prefix, words, count: words.length });
  }
}
