// Implementation

type TSinglyLinkedListNode = SinglyLinkedListNode | null;

// A SLL node contains only the data and pointer to the next
class SinglyLinkedListNode {
  constructor(public data) {}
  #next: TSinglyLinkedListNode = null;

  get next() {
    return this.#next;
  }

  set next(node: TSinglyLinkedListNode) {
    this.#next = node;
  }
}

// A SLL containers the head, i.e. the latest node and the size of the LL
class SinglyLinkedList {
  #head: TSinglyLinkedListNode = null;
  #size = 0;
  // A LL contains a method to verify if list is empty
  isEmpty() {
    return this.#size == 0;
  }
  // Insertion
  insert(value) {
    // If list is empty
    if (this.#head === null) {
      this.#head = new SinglyLinkedListNode(value);
    } else {
      // store last value in a var
      // assign the pointer of the new head to last var
      var temp = this.#head;
      this.#head = new SinglyLinkedListNode(value);
      this.#head.next = temp;
    }
    this.#size++;
  }
  // Deletion by value
  // Take in a value
  remove(value) {
    // store current head
    var currentHead = this.#head;
    // if current head is the value to be removed?
    // remove the head and assign it's pointer as the new head
    if (currentHead?.data == value) {
      this.#head = currentHead?.next ?? null;
      this.#size--;
    } else {
      // Declare a variable as prev
      var prev;
      // change values of current head to next pointer
      // and loop until a next pointer exists
      while (currentHead?.next) {
        // if current head is required value
        // assign it's last node's point to current head's pointer
        // and get out of the loop
        if (currentHead.data == value) {
          prev.next = currentHead.next;
          prev = currentHead;
          currentHead = currentHead.next;
          break;
        }
        // or else set current head node as prev
        // and set current head's next pointer node as current head
        prev = currentHead;
        currentHead = currentHead.next;
      }
      //if the value wasn't found in the middle or head
      // it must be tail, set prev's next to null
      if (currentHead?.data == value) {
        prev.next = null;
      }
      // decrease the size by 1
      this.#size--;
    }
  }
  // Delete at head
  deleteAtHead() {
    // initialize var toReturn
    var toReturn = null;

    // if current head is not null
    // set toReturn to data of current head
    // set current head to the next pointer of current head
    // decrease size
    if (this.#head !== null) {
      toReturn = this.#head.data;
      this.#head = this.#head.next;
      this.#size--;
    }
    return toReturn;
  }

  find(value) {
    var currentHead = this.#head;

    while (currentHead?.next) {
      if (currentHead.data == value) {
        return true;
      }

      currentHead = currentHead.next;
    }

    return false;
  }
}

var sll1 = new SinglyLinkedList();
sll1.insert(1); // linked list is now: 1 -> null
sll1.insert(12); // linked list is now: 12 -> 1 -> null
sll1.insert(20); // linked list is now: 20 -> 12 -> 1 -> null

var sll1 = new SinglyLinkedList();
sll1.insert(1); // linked list is now:  1 -> null
sll1.insert(12); // linked list is now: 12 -> 1 -> null
sll1.insert(20); // linked list is now: 20 -> 12 -> 1 -> null
sll1.remove(12); // linked list is now: 20 -> 1 -> null
sll1.remove(20); // linked list is now: 1 -> null

var sll1 = new SinglyLinkedList();
sll1.insert(1); // linked list is now:  1 -> null
sll1.insert(12); // linked list is now: 12 -> 1 -> null
sll1.insert(20); // linked list is now: 20 -> 12 -> 1 -> null
sll1.deleteAtHead(); // linked list is now:  12 -> 1 -> null
