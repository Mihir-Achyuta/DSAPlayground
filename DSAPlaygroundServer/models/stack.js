class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  push(val) {
    var newNode = new Node(val);
    if (this.size === 0) {
      this.start = newNode;
      this.end = newNode;
    } else {
      var temp = this.start;
      this.start = newNode;
      this.start.next = temp;
    }
    this.size++;
    return this.size;
  }

  pop() {
    if (this.size === 0) {
      return null;
    }

    var startNode = this.start;

    if (this.length === 1) {
      this.start = null;
      this.end = null;
    } else {
      this.start = this.start.next;
    }
    this.size--;

    return startNode.val;
  }
}

module.exports = { Stack };
