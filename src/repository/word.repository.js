import Word from "../schemas/word.schema.js";
import Trie from "../core/Trie.js";

export default class WordRepository {
  async insertWord(word) {
    const newWord = new Word({ word });
    await newWord.save();
  }
}
