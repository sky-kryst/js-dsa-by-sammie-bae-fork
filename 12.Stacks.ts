// Implementation

class Stack<TElement> {
  #array: Array<TElement> = [];

  /**
   * @returns copy of the stack
   */
  getBuffer() {
    return this.#array.slice();
  }

  /**
   * @returns if stack is empty
   */
  isEmpty() {
    return this.#array.length == 0;
  }

  /**
   * @returns topmost element of the stack
   */
  peek() {
    return this.#array[this.#array.length - 1];
  }

  // Insertion
  push(value: TElement) {
    this.#array.push(value);
  }

  /**
   * @description deletes topmost element
   * @returns topmost element
   */
  pop() {
    return this.#array.pop();
  }
}

//instance of the stack class
var stack1 = new Stack();

console.log(stack1); // {array: []}

stack1.push(10);
console.log(stack1.peek()); // 10
stack1.push(5);
console.log(stack1.peek()); // 5

stack1.push(1);
stack1.push(2);
stack1.push(3);
console.log(stack1); // {array: [1,2,3]}

stack1.pop();
stack1.pop();
stack1.pop();

console.log(stack1); // {array: []}

// Access
function stackAccessNthTopNode(stack: Stack<any>, n: number) {
  if (n <= 0) throw "error";

  let bufferStack = stack.getBuffer();

  while (--n !== 0) {
    bufferStack.pop();
  }
  return bufferStack.pop();
}

var stack2 = new Stack();
stack2.push(1);
stack2.push(2);
stack2.push(3);
stackAccessNthTopNode(stack2, 2); // 2

// Search
function stackSearch(stack: Stack<any>, element) {
  let bufferStack = stack.getBuffer();

  while (!bufferStack.isEmpty()) {
    if (bufferStack.pop() == element) {
      return true;
    }
  }
  return false;
}

var stack3 = new Stack();
stack3.push(1);
stack3.push(2);
stack3.push(3);
stackSearch(stack3, 3); // true
