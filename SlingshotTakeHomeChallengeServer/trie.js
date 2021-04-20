const fs = require("fs");
const trieData = JSON.parse(fs.readFileSync("trieDB.json"));

class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.isEnd = Object.keys(this.children).length > 0 ? false : true;
  }
}

class Trie {
  constructor() {}
  add(word) {}
  delete(word) {}
  search(word) {}
  autocomplete(word) {}
  display() {}
}
