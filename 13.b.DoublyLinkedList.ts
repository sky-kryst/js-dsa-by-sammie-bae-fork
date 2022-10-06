// Implementation
// A DDL node has 3 props
// the current data and pointer to its next and prev node
type TDoublyLinkedListNode = DoublyLinkedListNode | null;
class DoublyLinkedListNode {
  constructor(public data) {}
  #next: TDoublyLinkedListNode = null;
  #prev: TDoublyLinkedListNode = null;

  get next() {
    return this.#next;
  }
  get prev() {
    return this.#prev;
  }

  set next(node: TDoublyLinkedListNode) {
    this.#next = node;
  }
  set prev(node: TDoublyLinkedListNode) {
    this.#prev = node;
  }
}

// A DLL has a head as well as a tail, and size of the LL
class DoublyLinkedList {
  #head: TDoublyLinkedListNode = null;
  #tail: TDoublyLinkedListNode = null;
  #size = 0;

  isEmpty() {
    return this.#size == 0;
  }
  // Insertion at head
  // Accept value to be inserted
  insertAtHead(value) {
    // if no head, set head as new node and tail as current head
    if (this.#head === null) {
      this.#head = new DoublyLinkedListNode(value);
      this.#tail = this.#head;
    } else {
      // else store the new node in a var
      // set the next ptr of var to current head
      // set prev ptr of head to current var
      // set current head to var
      var temp = new DoublyLinkedListNode(value);
      temp.next = this.#head;
      this.#head.prev = temp;
      this.#head = temp;
    }
    // increment the size
    this.#size++;
  }
  // Insertion at tail
  // Take a value to be inserted at tail
  insertAtTail(value) {
    // if no tail, set head as new node and tail as current tail
    if (this.#tail === null) {
      this.#tail = new DoublyLinkedListNode(value);
      this.#head = this.#tail;
    } else {
      // else store the new node in a var
      // set the next ptr of var to current tail
      // set prev ptr of tail to current var
      // set current tail to var
      var temp = new DoublyLinkedListNode(value);
      temp.prev = this.#tail;
      this.#tail.next = temp;
      this.#tail = temp;
    }
    // increment the size
    this.#size++;
  }
  // Deletion at head
  deleteAtHead() {
    // initialize temp variable
    var toReturn = null;

    // if head is not null
    if (this.#head !== null) {
      // set return to current head
      toReturn = this.#head.data;

      // if only one element exists
      // set both head and tail to null
      if (this.#tail === this.#head) {
        this.#head = null;
        this.#tail = null;
      } else {
        // else set current head to its next pointer
        // and its prev ptr to null
        this.#head = this.#head.next;
        this.#head && (this.#head.prev = null);
      }
    }
    // decrement size of LL
    this.#size--;
    // return var or null
    return toReturn;
  }
  // Deletion at tail
  // same as deletion at head
  // but set tail to prev value and remove the next ptr
  deleteAtTail() {
    var toReturn = null;

    if (this.#tail !== null) {
      toReturn = this.#tail.data;

      if (this.#tail === this.#head) {
        this.#head = null;
        this.#tail = null;
      } else {
        this.#tail = this.#tail.prev;
        this.#tail && (this.#tail.next = null);
      }
    }
    this.#size--;
    return toReturn;
  }
  // Search element starting from head
  // take element value to be searched
  findStartingHead(value) {
    // store current head in a variable
    var currentHead = this.#head;
    // loop until variable has a next pointer
    // if the data of var is the req value, return true and from the loop
    // set variable to its next ptr at end of each loop
    while (currentHead?.next) {
      if (currentHead.data == value) {
        return true;
      }
      currentHead = currentHead.next;
    }
    // else return false
    return false;
  }
  // Search for a value starting from tail
  // same as for starting from head
  // instead of next ptr go to prev ptr until value is found
  // return true and exist on found
  findStartingTail(value) {
    var currentTail = this.#tail;
    while (currentTail?.prev) {
      if (currentTail.data == value) {
        return true;
      }
      currentTail = currentTail.prev;
    }
    return false;
  }
}

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll1.insertAtTail(30); // ddl1's structure: tail: 30  head: 20

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll1.insertAtTail(30); // ddl1's structure: tail: 30  head: 20
dll1.deleteAtTail();

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll1.insertAtTail(30); // ddl1's structure: tail: 30  head: 20
dll1.findStartingHead(10); // true
dll1.findStartingHead(100); // false

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll1.insertAtTail(30); // ddl1's structure: tail: 30  head: 20
dll1.findStartingTail(10); // true
dll1.findStartingTail(100); // false

// Reverse linked lists
// takes in a SLL to reverse
function reverseSingleLinkedList(sll) {
  // store head node of the sll in a node var
  // define a prev variable to reverse order of sll
  // and initialize it to null
  var node = sll.head;
  var prev = null;
  // keep on iterating node as the next ptr of the current node
  // break loop when next pointer empty
  while (node) {
    // store the next ptr in a temp
    // set node's next ptr to prev var
    // set prev as current node
    // break loop if temp is empty i.e. queue over
    // or set node to temp i.e. next node
    var temp = node.next;
    node.next = prev;
    prev = node;
    if (!temp) break;
    node = temp;
  }
  // return node
  return node;
}

// Delete duplicates in unsorted linkedlist
// take a SSL
function deleteDuplicateInUnsortedSll(sll1) {
  // initialize an empty array as track
  var track = [];

  // store head of SLL as temp
  // initialize prev to null
  var temp = sll1.head;
  var prev = null;

  // loop and keep incrementing temp to the next node
  // exit when temp null
  while (temp) {
    // if track already contains the data of current node
    // set next node of prev as next node of temp, i.e. omit current node
    // decrease the size of SLL
    if (track.indexOf(temp.data) >= 0 && prev) {
      prev.next = temp.next;
      sll1.size--;
    } else {
      // else push the data in track
      // set prev as temp variable
      track.push(temp.data);
      prev = temp;
    }
    // set temp to next node
    temp = temp.next;
  }
  // console temp
  console.log(temp);
}
