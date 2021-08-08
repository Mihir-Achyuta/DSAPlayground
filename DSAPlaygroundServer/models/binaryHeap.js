class MaxBinaryHeap {
  constructor(storedHeap) {
    this.values = storedHeap;
  }

  insert(value) {
    this.values.push(value);
    return this.bubbleUp();
  }

  bubbleUp() {
    //gets start index and index value because we start inserting it at the end
    var index = this.values.length - 1;
    var indexValue = this.values[index];

    //dont want numbers in negative indices
    while (index > 0) {
      //gets the parent of the index and the value of the parent
      var parent = Math.floor((index - 1) / 2);
      var parentValue = this.values[parent];
      //if the index value is greater than parent value (max heap rule)
      //then swap
      if (indexValue > parentValue) {
        this.values[index] = parentValue;
        this.values[parent] = indexValue;
      }
      //new index is parent to prevent infinite loop and to keep track of newly swapped value index
      index = parent;
    }
    return this.values;
  }

  extractMax() {
    //gets the last value in the top position
    var returnedMax = this.values.shift();
    this.values.unshift(this.values[this.values.length - 1]);
    this.values.pop();
    //puts down the last value in the correct position
    this.bubbleDown();
    return returnedMax;
  }

  bubbleDown() {
    //we get the value we are bubbling down and index
    var index = 0;
    var indexValue = this.values[index];
    //get array length for shorter code
    var length = this.values.length;
    //while true since we will break manually
    while (true) {
      //gets the left and right child indices
      var leftChild = index * 2 + 1;
      var rightChild = index * 2 + 2;
      //we need to see which child to swap so define a swap here
      var swap = null;
      //defines the children values but we need to make sure that they actually have value in array
      var leftChildValue, rightChildValue;
      //left child check
      if (leftChild < length) {
        leftChildValue = this.values[leftChild];
        if (leftChildValue > indexValue) {
          swap = leftChild;
        }
      }
      //right child check
      if (rightChild < length) {
        rightChildValue = this.values[rightChild];
        if (
          (swap === null && rightChildValue > indexValue) ||
          (swap !== null && rightChildValue > leftChildValue)
        ) {
          swap = rightChild;
        }
      }
      //breaks if none of children greater than parent
      if (swap === null) {
        break;
      }
      //if there is a swap we do it here
      var temp = this.values[index];
      this.values[index] = this.values[swap];
      this.values[swap] = temp;
      index = swap;
    }
  }
}

module.exports = { MaxBinaryHeap };
