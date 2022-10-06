import { HashTable } from "./11.HashTables";
// Implementation

// LFULLNode is a DLL node with
// a freqCount property set to 1
// because a node exists only when hit
// instead of a single value data
// it also consists of a key value
// to keep track of the hash key
class LFULLNode {
  #data: number;
  #prev: LFULLNode | null = null;
  #next: LFULLNode | null = null;
  #freqCount = 1; // store the maximum hit count in the node itself

  constructor(private key: number | string, value: any) {
    this.#data = value;
  }

  getKey() {
    return this.key;
  }

  get freqCount() {
    return this.#freqCount;
  }

  set freqCount(count: number) {
    this.#freqCount = count;
  }

  get data() {
    return this.#data;
  }

  set data(value: number) {
    this.#data = value;
  }

  set next(node: LFULLNode | null) {
    this.#next = node;
  }

  get next() {
    return this.#next;
  }

  set prev(node: LFULLNode | null) {
    this.#prev = node;
  }

  get prev() {
    return this.#prev;
  }

  incrementFreqCount() {
    this.#freqCount++;
  }
}
/* 
this.head = new LFULLNode("buffer head", null);
    this.tail = new LFULLNode("buffer tail", null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
     */

class LFUDoublyLinkedList {
  // initialize buffer headers
  private head = new LFULLNode("buffer head", null);
  private tail = new LFULLNode("buffer tail", null);
  private size = 0;
  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Removes the second node
  // since head always needs to exists
  insertAtHead(node: LFULLNode) {
    node.next = this.head.next;
    if (this.head.next) {
      this.head.next.prev = node;
      this.head.next = node;
      node.prev = this.head;
      this.size++;
    }
  }

  // Removes the penultimate node
  // since tail always needs to exists
  removeAtTail() {
    let oldTail = this.tail.prev;
    let prev = this.tail.prev;
    if (prev?.prev) {
      prev.prev.next = this.tail;
      this.tail.prev = prev.prev;
      this.size--;
      return oldTail;
    }
  }

  removeNode(node: LFULLNode) {
    if (node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this.size--;
    }
  }
}

/**
 * The head and tail nodes don’t store any data. They are created just for conveniently manipulating the linked list.
 * Nodes between the head and tail nodes are used to store data, each node for one value. Every node has two pointers, pointing to the previous and the next nodes. Each node has two attributes, one is the value and another is the count of this node.
 * Nodes near the tail are least frequently accessed. They will be removed if cache reaches to its capacity.
 * Nodes in LFU are sorted by frequency(count).
 */

class LFUCache {
  constructor(private capacity: number) {}
  private keys: HashTable<LFULLNode | null> = new HashTable<null>(
    this.capacity
  ); // stores LFULLNode
  private freq: HashTable<LFUDoublyLinkedList | null> = new HashTable<null>(
    this.capacity
  ); // stores LFUDoublyLinkedList
  private minFreq = 0; // the min value among all the freq keys
  private size = 0; // initial size

  /* 
  a key and value are taken to add to the cache
  mostly could be the same thing
  because and LFULLNode is just a LLNode with data as well as it's corr. key property
  the key is used to set as key in corr. keys table for resp. LFULLNode

    Check if the value already exists in keys hash
    if not
      create new LFULLNode and set it as value of key in keys hash
      check if cache size has reached it's capacity,
      if not
        check if freq with key 1 exists in freq table
        if not
          create a new DLL in freq table with key 1
        Increment the size of the cache
      if capacity full
        store the node at tail of least accessed freq from freq table
        delete that node from keys table
        check if there's any node with freq 1 in freq table, since this is new node
        if not
          create a new DLL in freq table with key 1
        Add the new node at DLL Head
      set the minFreq to 1 causes new node was added for either case
    if node already exists, i.e. node with same key in keys
      store the node's old freqCount
      assign new value to the node
      increment the node's freqCount
      remove the old node from freq table at old freqCount
      if key for the new freqCount does not exists in freq table
        create new DLL and attach to it
      add the node at head of the DLL
      if oldCount of node was the least accessed count and no node exists in it's corr. DLL
        increment minFreq
   */
  set(key: number, value: number) {
    // Check if the value already exists in keys
    let node = this.keys.getDoubleHashed(key);

    // if not
    if (node == undefined) {
      // create new LFULLNode
      node = new LFULLNode(key, value);

      // set node as value of key in keys hash
      this.keys.setDoubleHashed(key, node);

      // check if cache size has reached it's capacity,
      // if not
      if (this.size != this.capacity) {
        // check if there's any node with freq 1 in freq table
        // if not
        if (this.freq.getDoubleHashed(1) === undefined) {
          // create a new DLL in freq table with key 1
          this.freq.setDoubleHashed(1, new LFUDoublyLinkedList());
        }
        // add the new node at DLL Head
        this.freq.getDoubleHashed(1)?.insertAtHead(node);
        // and increment the size of the cache
        this.size++;
      } else {
        // store the node at tail of least accessed freq from freq table
        // via minFreq in a variable
        // and delete that node from keys table
        let oldTail = this.freq.getDoubleHashed(this.minFreq)?.removeAtTail();
        this.keys.deleteDoubleHashed(oldTail?.getKey() as number);

        // check if there's any node with freq 1 in freq table
        // if not
        if (this.freq.getDoubleHashed(1) === undefined) {
          // create a new DLL in freq table with key 1
          this.freq.setDoubleHashed(1, new LFUDoublyLinkedList());
        }
        // add the new node at DLL Head
        this.freq.getDoubleHashed(1)?.insertAtHead(node);
      }

      // set the minFreq to 1 causes new node was added
      this.minFreq = 1;
    } else {
      // if node already exists, i.e. node with same key in keys
      // save the node old freqCount in a var
      let oldFreqCount = node.freqCount;
      // assign the new value to node data
      node.data = value;
      // and increment the node's freqCount because even if the value is new
      // the key being accessed is the same
      node.freqCount++;

      // remove the old node from freq table
      // via old freqCount
      this.freq.getDoubleHashed(oldFreqCount)?.removeNode(node);

      // if key for the new freqCount does not exists in freq table
      if (this.freq.getDoubleHashed(node.freqCount) === undefined) {
        // create new DLL and attach to it
        this.freq.setDoubleHashed(node.freqCount, new LFUDoublyLinkedList());
      }

      // add the node at head to that DLL
      this.freq.getDoubleHashed(node.freqCount)?.insertAtHead(node);

      // if oldCount of node was the least accessed count of cache
      // and no node exists in it's corr. DLL
      if (
        oldFreqCount == this.minFreq &&
        Object.keys(this.freq.getDoubleHashed(oldFreqCount) ?? {}).length === 0
      ) {
        // increment minFreq
        this.minFreq++;
      }
    }
  }

  get(key: number) {
    // check if key exists in keys hash
    let node = this.keys.getDoubleHashed(key);

    // if not
    if (node == undefined) {
      // return null
      return null;
    } else {
      // if node exists
      // store old freq count in a var
      let oldFreqCount = node.freqCount;
      // increment freq count
      node.freqCount++;

      // remove the resp. node from freq hash at old freqCount
      this.freq.getDoubleHashed(oldFreqCount)?.removeNode(node);

      // check if DLL exists at new freq count at freq hash
      if (this.freq.getDoubleHashed(node.freqCount) === undefined) {
        // if not attach it
        this.freq.setDoubleHashed(node.freqCount, new LFUDoublyLinkedList());
      }

      // add node at head to the DLL at freqCount
      this.freq.getDoubleHashed(node.freqCount)?.insertAtHead(node);

      // if the last freqCount was least count of cache
      // and has no more nodes exists in that DLL
      if (
        oldFreqCount == this.minFreq &&
        Object.keys(this.freq.getDoubleHashed(oldFreqCount) ?? {}).length == 0
      ) {
        // increment freq counter
        this.minFreq++;
      }
      return node.data;
    }
  }
}

var myLFU = new LFUCache(5);
myLFU.set(1, 1); // state of myLFU.freq: {1: 1}
myLFU.set(2, 2); // state of myLFU.freq: {1: 2<->1}
myLFU.set(3, 3); // state of myLFU.freq: {1: 3<->2<->1}
myLFU.set(4, 4); // state of myLFU.freq: {1: 4<->3<->2<->1}
myLFU.set(5, 5); // state of myLFU.freq: {1: 5<->4<->3<->2<->1}
myLFU.get(1); // returns 1, state of myLFU.freq: {1: 5<->4<->3<->2, 2: 1}
myLFU.get(1); // returns 1, state of myLFU.freq: {1: 5<->4<->3<->2, 3: 1}
myLFU.get(1); // returns 1, state of myLFU.freq: {1: 5<->4<->3<->2, 4: 1}
myLFU.set(6, 6); // state of myLFU.freq: {1: 6<->5<->4<->3, 4: 1}
myLFU.get(6); // state of myLFU.freq: {1: 5<->4<->3, 4: 1, 2: 6}
