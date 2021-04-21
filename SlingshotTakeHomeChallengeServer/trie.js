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
    console.log(`The word ${word} has been added in the trie`);
  }
  delete(word) {}
  search(word) {
    let currNode = this.rootNode;
    let found = true;
    for (let i of word) {
      //if there is no children for the ith letter :
      //the word does not exist in the trie so we exit out of the loop
      if (!currNode["children"][i]) {
        found = false;
        break;
      }
      currNode = currNode["children"][i];
    }
    console.log(
      `The word ${word} is ${found ? "found" : "not found"} in the trie`
    );
  }
  autocomplete(word) {}
  display() {}
  reset() {
    //resets the trie by setting the parent to the original null root node
    this.rootNode = new TrieNode(null);
    console.log("The trie has been cleared and resetted");
  }
}

let trie = new Trie();
trie.add("cat");
trie.add("car");
trie.add("corn");
console.log(trie.rootNode);
