// Implementation

/**
 * @description Implementation of the Queue data structure
 */
export class Queue<TQueueElement> {
  #array: Array<TQueueElement> = [];

  /**
   * @returns copy of the queue
   */
  getBuffer() {
    return this.#array.slice();
  }

  /**
   * @returns if queue is empty
   */
  isEmpty() {
    return this.#array.length == 0;
  }

  /**
   * @returns last element of the queue
   */
  peek() {
    return this.#array[0];
  }

  /**
   * @param value
   * @description adds new {@link value} to the queue
   * @returns updated queue
   */
  enqueue(value: TQueueElement) {
    return this.#array.push(value);
  }

  /**
   * @description deletes the topmost element
   * @returns updated queue
   */
  dequeue() {
    return this.#array.shift();
  }

  /**
   *
   * @returns length of the queue
   */
  getLength() {
    return this.#array.length;
  }
}

//instance of the queue class
var queue1 = new Queue();

console.log(queue1); // { array: [] }

var queue1 = new Queue();

queue1.enqueue(1);
queue1.enqueue(2);
queue1.enqueue(3);

console.log(queue1); // {array: [1,2,3]}

queue1.dequeue();
console.log(queue1); // {array: [2,3]}

queue1.dequeue();
console.log(queue1); // {array: [3]}

// Access
export function queueAccessNthTopNode(queue: Queue<any>, n: number) {
  if (n <= 0) throw "error";

  var bufferQueue = queue.getBuffer();

  while (--n !== 0) {
    bufferQueue.dequeue();
  }
  return bufferQueue.dequeue();
}

// Search
export function queueSearch(queue: Queue<any>, element: any) {
  var bufferQueue = queue.getBuffer();

  while (!bufferQueue.isEmpty()) {
    if (bufferQueue.dequeue() ?? null == element) {
      return true;
    }
  }
  return false;
}
