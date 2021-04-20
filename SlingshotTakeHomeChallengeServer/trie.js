const fs = require("fs");
const trieData = JSON.parse(fs.readFileSync("trieDB.json"));

class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.isEnd = true;
  }
}

class Trie {
  constructor() {
    this.rootNode = new TrieNode(null);
  }
  add(word) {
    let currNode = this.rootNode;
    for (let i of word) {
      //if there is no children for the ith letter :
      //1. set the current Node end to false(it will have a child now)
      //2. the children[letter] of that node is a new Trie Node of the ith letter
      if (!currNode["children"][i]) {
        currNode["isEnd"] = false;
        currNode["children"][i] = new TrieNode(i);
      }
      currNode = currNode["children"][i];
    }
  }
  delete(word) {}
  search(word) {}
  autocomplete(word) {}
  display() {}
}

let trie = new Trie();
trie.add("cat");
trie.add("car");
trie.add("corn");
