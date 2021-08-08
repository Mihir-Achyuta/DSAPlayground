class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.start = null;
    this.end = null;
    this.length = 0;
  }

  enqueue(val) {
    var newNode = new Node(val);
    if (this.length === 0) {
      this.start = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.length === 0) {
      return null;
    }

    var removedNode = this.start;
    this.start = this.start.next;
    this.length--;

    if (this.length === 0) {
      this.start = null;
      this.end = null;
    }

    return removedNode;
  }
}
