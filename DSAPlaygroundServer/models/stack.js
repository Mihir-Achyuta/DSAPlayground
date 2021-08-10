class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor(storedStack) {
    this.start = null;
    this.end = null;
    this.size = 0;
    this.arr = storedStack;

    const length = storedStack.length;
    for (let i = 0; i < length; i++) {
      this.push(storedStack[i], true);
    }
  }

  push(val, initialFill = false) {
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
    !initialFill && this.arr.shift(val);

    return this.arr;
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
    this.arr.shift();

    return startNode.val;
  }
}

module.exports = { Stack };
