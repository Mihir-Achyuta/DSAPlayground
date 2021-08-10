//imports the fs method to locate the json file, colorize to format the json in display, and the trieData from the json file
const fs = require("fs");
const colorize = require("json-colorizer");

//1. a trieNode needs a letter for a value,
//2. children as it needs to hold  other letters(for cats, c has a, a has t, etc..),
//3. and a wordEnd variable to signify if a word has ended
class TrieNode {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
  }
}

//1. the trie gets the trieData from the json file each request and
//2. has the words and structure global variables as it makes it easier to keep track of nodes and words when recursively traversing
class Trie {
  constructor(storedTrie) {
    this.rootNode = storedTrie;
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

    return this.rootNode;
  }

  //there are a couple of edge cases to delete from a trie
  //1. The word is not in the trie => we dont do anything to trie and return true
  //2. The word is its own branch in the trie(has no children aside from the default word and is not a child of any nodes) => delete all the nodes from that branch
  //3. The word is a prefix of another word in the trie(deleting all the nodes there would delete the other word) => set the prefix wordend to false
  //4. The word has a prefix of another word in the trie => delete all words after the prefix or after last known plural children node
  //OR
  //We could easily delete every word by setting the wordEnd(if it exists) of last letter to false however the deleted nodes still appear in memory
  delete(word) {
    //variables to check special edge cases
    let ownBranch = true;
    let isPrefix = false;
    let hasPrefix = false;
    let depth = 0;

    //the last known plural children and prefix Nodes for case 4 and normal case
    let lastPluralChildren = { depth: 0, word: word, node: null };
    let lastPrefix = { depth: 0, word: word, node: null };
    let currNode = this.rootNode;

    for (let i of word) {
      //1. if child does not exist then we can't delete
      if (!currNode["children"][i]) {
        return false;
      }
      //2. if the node is not the null node, we check if it has only 1 child to see if it is an only branch and we increment depth by 1
      if (currNode["letter"]) {
        depth++;
        let childrenKeys = Object.keys(currNode["children"]);
        if (childrenKeys.length > 1) {
          ownBranch = false;
          lastPluralChildren["depth"] = depth;
          lastPluralChildren["node"] = currNode;
        }
      }
      //4. if the node has a word end before the last letter then it has a prefix of another word in it
      if (currNode["wordEnd"]) {
        lastPrefix["depth"] = depth;
        lastPrefix["node"] = currNode;
        hasPrefix = true;
      }
      currNode = currNode["children"][i];
    }
    //3. We check the last node to see if it has children => if it does then it is a prefix
    if (Object.keys(currNode["children"]).length > 0) {
      isPrefix = true;
    }
    //We need to see that we actually delete a word and not a prefix
    if (!currNode["wordEnd"]) {
      return false;
    }

    //now depending on edge case properties we delete
    //delete in order of isPrefix => hasPrefix => ownBranch => regular Case (we dont want to delete all nodes if there are multiple words on 1 branch)

    //if the word is a prefix we CANNOT delete any nodes even if it is its own branch or has a prefix since we will lose the other full word
    //so just make wordEnd false
    if (isPrefix) {
      this.easyDelete(word);
    }
    //if the word is not a prefix and has a prefix then we must delete until the 2nd to last prefix even if it is on its own branch
    else if (hasPrefix) {
      let mostDepth =
        lastPluralChildren["depth"] > lastPrefix["depth"]
          ? lastPluralChildren
          : lastPrefix;
      let removedChild = mostDepth["word"][mostDepth["depth"]];
      delete mostDepth["node"]["children"][removedChild];
    }
    //if the word has no prefixes at all and no branches then we just delete off the branch
    else if (ownBranch) {
      let firstChild = word.substring(0, 1);
      delete this.rootNode["children"][firstChild];
      // fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
    }
    //if the word has multiple branches and is not/has no prefix then we go from the end and delete until the parent node has children
    //we dont want to delete any other children nodes aside from the one we are deleting
    else {
      let mostDepth =
        lastPluralChildren["depth"] > lastPrefix["depth"]
          ? lastPluralChildren
          : lastPrefix;
      let removedChild = mostDepth["word"][mostDepth["depth"]];
      delete mostDepth["node"]["children"][removedChild];
    }
    //save the updated trie node in json database
    fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
    return true;
  }

  //an easy delete function that just marks the wordEnd to false(assuming the word exists)
  //I originally implemented this as my main delete function however it did not delete any nodes so it would waste a lot of space so now it serves as an edge case method
  easyDelete(word) {
    let currNode = this.rootNode;

    for (let i of word) {
      if (!currNode["children"][i]) {
        return false;
      }
      currNode = currNode["children"][i];
    }
    if (currNode["wordEnd"]) {
      currNode["wordEnd"] = false;
      //save the updated trie node in json database
      fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
      return true;
    } else {
      return false;
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
      //can't autocomplete if there is no prefixed words in the trie
      if (!currNode["children"][i]) {
        found = false;
        break;
      }
      currNode = currNode["children"][i];
    }
    if (found) {
      //after traversing the trie of the prefix, display the words for its own prefix
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

  //does a search as we traverse down from the parent to the leftmost child of the trie
  //once the leftmost children have been printed then the for loop increments and we keep making each child node go to the right add those children to the string
  displayWords(currNode, string = "") {
    let nodeChildren = Object.keys(currNode["children"]);

    //adds the word to the global word variable if one is detected
    if (currNode["wordEnd"]) {
      this.words += " " + string;
    }
    //we will traverse the left children fully first using recursion then the right children
    for (let i of nodeChildren) {
      this.displayWords(currNode["children"][i], string + i);
    }
  }

  //puts the json in a string and then pretty prints it in the console(client side)
  displayStructure() {
    this.structure = colorize(JSON.stringify(this.rootNode), {
      pretty: true,
    });
  }

  //resets the trie by setting the root node to null
  reset() {
    this.rootNode = new TrieNode(null);
    //save the updated trie node in json database
    fs.writeFileSync("trieDB.json", JSON.stringify(this.rootNode));
  }
}

module.exports.Trie = Trie;
