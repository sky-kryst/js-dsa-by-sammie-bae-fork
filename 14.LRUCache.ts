import { HashTable } from "./11.HashTables";

class LRUNode {
  constructor(private key: number | string, private data: number | null) {}
  #prev: LRUNode | null = null;
  #next: LRUNode | null = null;
  #freqCount = 1;

  getKey() {
    return this.key;
  }

  get freqCount() {
    return this.#freqCount;
  }
  getData() {
    return this.data;
  }
  setData(value: number) {
    this.data = value;
  }

  set next(node: LRUNode | null) {
    this.#next = node;
  }

  get next() {
    return this.#next;
  }

  set prev(node: LRUNode | null) {
    this.#prev = node;
  }

  get prev() {
    return this.#prev;
  }

  incrementFreqCount() {
    this.#freqCount++;
  }
}

class LRUCache {
  // a dictionary ot check if the node exists
  private keys: HashTable<LRUNode | null> = new HashTable<null>(this.capacity);
  // a DLL implementation to show the read order of the nodes
  private head = new LRUNode("", null);
  private tail = new LRUNode("", null);
  constructor(private capacity: number) {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  removeNode(node: LRUNode) {
    let prev = node.prev!;
    let next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  addNode(node: LRUNode) {
    // store the penulimate node
    let realTail = this.tail.prev;
    // set it's next to node
    realTail!.next = node;
    // set penultimate to node
    this.tail.prev = node;
    // set node's prev to penultimate
    node.prev = realTail;
    // and next to the tail of DLL
    node.next = this.tail;
  }

  get(key: number | string) {
    // check if node exists in keys hash
    let node = this.keys.getDoubleHashed(key as number);
    // if not
    if (node == undefined) {
      // return null
      return null;
    } else {
      // else
      // remove node from the DLL
      this.removeNode(node);
      // add the same node to DLL
      // this will add the node at tail
      this.addNode(node);
      // return node.data
      return node.getData();
    }
  }

  set(key: number, value: number) {
    // check if node already exists
    let node = this.keys.getDoubleHashed(key as number);
    // if does
    if (node) {
      // remove to delete add node with new value
      this.removeNode(node);
    }

    // create node instance with new value
    let newNode = new LRUNode(key, value);

    // add it to the DLL
    this.addNode(newNode);
    // add it to keys hash
    this.keys.setDoubleHashed(key, newNode);

    // if keys hash table capacity exceeds cache capacity
    if (Object.keys(this.keys).length > this.capacity) {
      // store the second to head node
      let realHead = this.head.next;
      // remove it from DLL
      this.removeNode(realHead!);
      // remove it from keys hash
      this.keys.deleteDoubleHashed(realHead!.getKey() as number);
    }
  }
}

let myLRU = new LRUCache(5);

myLRU.set(1, 1); // 1
myLRU.set(2, 2); // 1 <-> 2
myLRU.set(3, 3); // 1 <-> 2 <-> 3
myLRU.set(4, 4); // 1 <-> 2 <-> 3 <-> 4
myLRU.set(5, 5); // 1 <-> 2 <-> 3 <-> 4 <-> 5

myLRU.get(1); // 2 <-> 3 <-> 4 <-> 5 <-> 1
myLRU.get(2); // 3 <-> 4 <-> 5 <-> 1 <-> 2

myLRU.set(6, 6); // 4 <-> 5 <-> 1 <-> 2 <-> 6
myLRU.set(7, 7); // 5 <-> 1 <-> 2 <-> 6 <-> 7
myLRU.set(8, 8); // 1 <-> 2 <-> 6 <-> 7 <-> 8
