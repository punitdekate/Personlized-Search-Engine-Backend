import Word from "../schemas/word.schema.js";
async function loadWordsIntoTrie(trie) {
  const words = await Word.find().exec();
  words.forEach((entry) => trie.insert(entry.word));
  console.log("Trie populated with", words.length, "words");
}

export default loadWordsIntoTrie;
