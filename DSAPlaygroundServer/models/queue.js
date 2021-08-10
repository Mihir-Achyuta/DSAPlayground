class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor(storedQueue) {
    this.start = null;
    this.end = null;
    this.length = 0;
    this.arr = storedQueue;

    const length = storedQueue.length;
    for (let i = 0; i < length; i++) {
      this.enqueue(storedQueue[i], true);
    }
  }

  enqueue(val, initialFill = false) {
    var newNode = new Node(val);
    if (this.length === 0) {
      this.start = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    this.length++;
    !initialFill && this.arr.push(val);

    return this.arr;
  }

  dequeue() {
    if (this.length === 0) {
      return null;
    }

    this.start = this.start.next;
    this.length--;

    if (this.length === 0) {
      this.start = null;
      this.end = null;
    }

    const deletedNum = this.arr[0];
    this.arr.shift();

    return deletedNum;
  }
}

module.exports = { Queue };
