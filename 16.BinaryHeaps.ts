class Heap {
  items: Array<number> = [];

  get() {
    return this.items.slice();
  }

  /**
   * @description swaps two elements at {@link index1} and {@link index2}
   * @param index1
   * @param index2
   */
  swap(index1: number, index2: number) {
    var temp = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }

  /**
   * @param index
   * @returns parent index of {@link index}
   */
  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * @param index
   * @returns left child index of {@link index}
   */
  leftChildIndex(index: number) {
    return index * 2 + 1;
  }

  /**
   * @param index
   * @returns right child index of {@link index}
   */
  rightChildIndex(index: number) {
    return index * 2 + 2;
  }

  /**
   * @param index
   * @returns parent element at {@link index}
   */
  parent(index: number) {
    return this.items[this.parentIndex(index)];
  }

  /**
   * @param index
   * @returns left child element at {@link index}
   */
  leftChild(index: number) {
    return this.items[this.leftChildIndex(index)];
  }

  /**
   * @param index
   * @returns right child element at {@link index}
   */
  rightChild(index: number) {
    return this.items[this.rightChildIndex(index)];
  }

  /**
   * @returns root of the tree
   */
  peek() {
    return this.items[0];
  }

  /**
   * @returns length of the tree
   */
  size() {
    return this.items.length;
  }
}

class MinHeap extends Heap {
  constructor(private array?: Array<number>) {
    super();
    if (this.array) this.array.forEach((element) => this.add(element));
  }
  /**
   * This code is used to bubble down the root element if
   * the order of the heap is not maintained
   */
  bubbleDown() {
    /**
     For every node only check which of it's children is smaller than itself
     swap that child with itself and bubble down the new child

    for a min heap
    initialize index to 0
    while left child of index exists and is smaller than parent
      check if right child is smaller than left child
        swap parent and right
      or
        swap parent and left
    change index to the node largest among the three and loop again

    // You only need to compare 2 relations to know if the order is right
      the left child and parent, and left child and right.
      Knowing only this you can know when to swipe which.
      After swiping, loop down from the new child  
      because the other side is already sorted. //
   */
    let index = 0;
    while (this.leftChild(index) && this.leftChild(index) < this.items[index]) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }
      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }

  /**
   * This code is used to bubble up the last element of the heap
   * if the order of the heap is not maintained
   */
  bubbleUp() {
    /**
    initialize index of that of the last element of the array
    while the last child has a parent and the parent is greater than last child
      swap parent and child
      change the index to the current parent index and loop again

      // You only need to compare the last index and it's parent
        to know if the order is broken.
        If broken, swap the elements and loop up from the parent //
   */
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) > this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }

  /**
    assign the newest element as the item,
    and bubble up
   */
  add(item: number) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }

  /**
    removes the root
    calls bubble down
    returns root
   */
  poll() {
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }

  removeItem(item: number) {
    const toBeRemoved = this.leftChildIndex(item);
    this.items[toBeRemoved] = this.leftChild(toBeRemoved);
    this.items.splice(toBeRemoved);
    return toBeRemoved;
  }
}

var mh1 = new MinHeap();
mh1.add(1);
mh1.add(10);
mh1.add(5);
mh1.add(100);
mh1.add(8);

console.log(mh1.poll()); // 1
console.log(mh1.poll()); // 5
console.log(mh1.poll()); // 8
console.log(mh1.poll()); // 10
console.log(mh1.poll()); // 100

class MaxHeap extends Heap {
  add(item: number) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }

  poll() {
    let item = this.items[0];
    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();
    return item;
  }

  removeItem(item: number) {
    const toBeRemoved = this.rightChildIndex(item);
    this.items[toBeRemoved] = this.rightChild(toBeRemoved);
    this.items.splice(toBeRemoved);
    return toBeRemoved;
  }

  bubbleDown() {
    let index = 0;
    while (
      this.leftChild(index) &&
      (this.leftChild(index) > this.items[index] ||
        this.rightChild(index) > this.items[index])
    ) {
      let biggerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) > this.items[biggerIndex]
      ) {
        biggerIndex = this.rightChildIndex(index);
      }
      this.swap(biggerIndex, index);
      index = biggerIndex;
    }
  }

  bubbleUp() {
    let index = this.items.length - 1;
    while (this.parent(index) && this.parent(index) < this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }
}

export function HeapSortAsc(array: Array<number>) {
  const minHeap = new MinHeap();

  array.forEach((element) => minHeap.add(element));

  const result: number[] = [];

  array.forEach(() => result.push(minHeap.poll()));

  return result;
}

export function HeapSortDesc(array: Array<number>) {
  const maxHeap = new MaxHeap();

  array.forEach((element) => maxHeap.add(element));

  const result: number[] = [];

  array.forEach(() => result.push(maxHeap.poll()));

  return result;
}

var mh2 = new MaxHeap();
mh2.add(1);
mh2.add(10);
mh2.add(5);
mh2.add(100);
mh2.add(8);

console.log(mh2.poll()); // 100
console.log(mh2.poll()); // 10
console.log(mh2.poll()); // 8
console.log(mh2.poll()); // 5
console.log(mh2.poll()); // 1
var minHeapExample = new MinHeap();
minHeapExample.add(12);
minHeapExample.add(2);
minHeapExample.add(23);
minHeapExample.add(4);
minHeapExample.add(13);
minHeapExample.items; // [2, 4, 23, 12, 13]

console.log(minHeapExample.poll()); // 2
console.log(minHeapExample.poll()); // 4
console.log(minHeapExample.poll()); // 12
console.log(minHeapExample.poll()); // 13
console.log(minHeapExample.poll()); // 23
var maxHeapExample = new MaxHeap();
maxHeapExample.add(12);
maxHeapExample.add(2);
maxHeapExample.add(23);
maxHeapExample.add(4);
maxHeapExample.add(13);
maxHeapExample.items; // [23, 13, 12, 2, 4]

console.log(maxHeapExample.poll()); // 23
console.log(maxHeapExample.poll()); // 13
console.log(maxHeapExample.poll()); // 12
console.log(maxHeapExample.poll()); // 2
console.log(maxHeapExample.poll()); // 4

class MedianHeap extends Heap {
  minHeap = new MinHeap();
  maxHeap = new MaxHeap();

  add(value: number) {
    if (value > this.median()) {
      this.minHeap.add(value);
    } else {
      this.maxHeap.add(value);
    }

    // Re balancing
    if (this.minHeap.size() - this.maxHeap.size() > 1) {
      this.maxHeap.add(this.minHeap.poll());
    }

    if (this.maxHeap.size() - this.minHeap.size() > 1) {
      this.minHeap.add(this.maxHeap.poll());
    }
  }

  median() {
    if (this.minHeap.size() == 0 && this.maxHeap.size() == 0) {
      return Number.NEGATIVE_INFINITY;
    } else if (this.minHeap.size() == this.maxHeap.size()) {
      return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.peek();
    } else {
      return this.maxHeap.peek();
    }
  }
}

var medianH = new MedianHeap();

medianH.add(12);
console.log(medianH.median()); // 12
medianH.add(2);
console.log(medianH.median()); // 7 ( because 12 + 2 = 14; 14/2 = 7)
medianH.add(23);
console.log(medianH.median()); // 12
medianH.add(13);
console.log(medianH.median()); // 12.5

var array1 = [12, 3, 13, 4, 2, 40, 23];

function getKthSmallestElement(array: number[], k: number) {
  var minH = new MinHeap();
  for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
    minH.add(array[i]);
  }
  for (var i = 1; i < k; i++) {
    minH.poll();
  }
  return minH.poll();
}
getKthSmallestElement(array1, 2); // 3
getKthSmallestElement(array1, 1); // 2
getKthSmallestElement(array1, 7); // 40

var array1 = [12, 3, 13, 4, 2, 40, 23];

function getKthBiggestElement(array: number[], k: number) {
  var maxH = new MaxHeap();
  for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
    maxH.add(array[i]);
  }
  for (var i = 1; i < k; i++) {
    maxH.poll();
  }
  return maxH.poll();
}
getKthBiggestElement(array1, 2); // 23
getKthBiggestElement(array1, 1); // 40
getKthBiggestElement(array1, 7); // 2
