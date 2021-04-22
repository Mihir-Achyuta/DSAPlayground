const fs = require("fs");
const colorize = require("json-colorizer");
const trieData = JSON.parse(fs.readFileSync("trieDB.json"));

class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
  }
}

class Trie {
  constructor() {
    this.rootNode = trieData;
    this.words = "";
    this.structure = {};
  }

  //this add method adds words to the trie and allows for multiple words of the same prefix to be considered as words as needed
  //for example if we inserted "cat" and then "cats" right after, "cat" would not be overridden by "cats" as a word (both are considered words)
  //the word end property set to true for "cat" would still maintain its relative role as a word
  add(word) {
    let currNode = this.rootNode;

    for (let i of word) {
      //if there is no children for the ith letter :
      //1. set the current Node end to false(it will have a child now)
      //2. the children[letter] of that node is a new Trie Node of the ith letter
      if (!currNode["children"][i]) {
        currNode["children"][i] = new TrieNode(i);
      }
      currNode = currNode["children"][i];
    }
    currNode["wordEnd"] = true;
    //save the updated trie node in json database
    fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
  }

  delete(word) {
    if (this.search(word)) {
      console.log("Can be deleted");
    } else {
      console.log("Can't be deleted");
    }
  }

  //the search method allows the user to see if a WORD is in the trie not a prefix
  //if "pasta" is in the trie then the method returns true if "pasta" was searched but false if "pas" was searched
  //"pas" is not a word in the trie, only a prefix in the word "pasta"
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
    //if we do have a possible word, we need to check if the word is an actual defined word instead of a prefix (no false positives)
    //if you search for "ca" in "cats" trie, it returns false as "ca" is not a word even though the letters are defined in "cats"
    if (found) found = currNode["wordEnd"];
    return found;
  }

  //this autocomplete method shows all the PREFIXED words in the trie given a prefix
  //a prefix is a word inside a word so "c" and "cat" and "cats" are prefixes of cats
  autocomplete(prefix) {
    let currNode = this.rootNode;
    let found = true;
    this.words = "";

    for (let i of prefix) {
      if (!currNode["children"][i]) {
        found = false;
        break;
      }
      currNode = currNode["children"][i];
    }
    if (found) {
      this.displayWords(currNode, prefix);
    }
    return { found: found, words: this.words };
  }

  //the display method first gets all the words in the trie and then gets the structure of the trie in JSON
  //i defined global variables for words and structure to easily and efficiently update the variables every recursive call
  display() {
    this.words = "";
    this.structure = {};
    this.displayWords(this.rootNode);
    this.displayStructure();

    return { words: this.words, structure: this.structure };
  }

  //does a search similar to a dfs pre order way
  displayWords(currNode, string = "") {
    let nodeChildren = Object.keys(currNode["children"]);

    if (currNode["wordEnd"]) {
      this.words += " " + string;
    }
    for (let i of nodeChildren) {
      this.displayWords(currNode["children"][i], string + i);
    }
  }

  //puts the json in a string and then pretty prints it with colors in the console
  displayStructure() {
    this.structure = colorize(JSON.stringify(this.rootNode), {
      pretty: true,
    });
  }

  reset() {
    //resets the trie by setting the parent to the original null root node
    this.rootNode = new TrieNode(null);
    //save the updated trie node in json database
    fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
  }
}

module.exports.Trie = Trie;
