class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(storedTree) {
    this.root = storedTree;
  }

  insert(value) {
    var newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return this.root;
    }

    var start = this.root;
    while (true) {
      if (start.value === newNode.value) {
        break;
      }
      if (start.value < newNode.value) {
        if (start.right === null) {
          start.right = newNode;
          break;
        } else {
          start = start.right;
        }
      } else {
        if (start.left === null) {
          start.left = newNode;
          break;
        } else {
          start = start.left;
        }
      }
    }

    return this.root;
  }

  search(value) {
    if (this.root === null) {
      return undefined;
    }

    if (this.root.value === value) {
      return true;
    }

    var searchNode = this.root;

    while (true) {
      if (
        searchNode.right === null &&
        searchNode.left === null &&
        searchNode.value !== value
      ) {
        return false;
      }
      if (searchNode.right.value === value || searchNode.left.value === value) {
        return true;
      }

      if (value > searchNode.value) {
        searchNode = searchNode.right;
      } else {
        searchNode = searchNode.left;
      }
    }
  }

  display() {
    const queue = [];
    let result = ``;

    queue.push(this.root);
    while (queue.length > 0) {
      const size = queue.length;

      for (let i = 0; i < size; i++) {
        const currNode = queue.shift();
        result += currNode.value + " ";

        if (currNode.left) queue.push(currNode.left);
        if (currNode.right) queue.push(currNode.right);
      }
      result += "\n";
    }

    return result;
  }
}

module.exports = { BinarySearchTree };
