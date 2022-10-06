// Linear probing

// Declare hashtable class
export class HashTable<TValue> {
  // pre-define the size of the table
  size: number;
  // initialize keys and values array
  keys: Array<number | null>;
  values: Array<TValue | null>;
  // keep a counter for size of the table occupied
  limit = 0;

  // A method to initialize an array of 'x' length
  // by initializing all values to null
  initArray<TElement>(size: number) {
    var array: Array<TElement | null> = [];
    for (var i = 0; i < size; i++) {
      array.push(null);
    }
    return array;
  }

  constructor(size: number) {
    // pre-define the size of the table
    this.size = size;
    // initialize keys and values array
    this.keys = this.initArray<number>(size);
    this.values = this.initArray<TValue>(size);
    // keep a counter for size of the table occupied
    this.limit = this.limit;
  }

  // A method to create a hash of the given integer key
  hash(key: number) {
    // Check if int
    if (!Number.isInteger(key)) throw "must be int";

    return key % this.size;
  }

  #getHashedIndexLinearly(key: number, getNextIndexForKeyValue: number | null) {
    let hashedIndex = this.hash(key);

    while (this.keys[hashedIndex] != getNextIndexForKeyValue) {
      hashedIndex++;

      hashedIndex = hashedIndex % this.size;
    }

    return hashedIndex;
  }

  setLinearly(key: number, value: TValue) {
    if (this.limit >= this.size) throw "hash table is full";

    var hashedIndex = this.#getHashedIndexLinearly(key, null);

    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
  }

  getLinearly(key: number) {
    return this.values[this.#getHashedIndexLinearly(key, key)];
  }

  deleteLinearly(key: number) {
    var hashedIndex = this.#getHashedIndexLinearly(key, key);

    this.keys[hashedIndex] = null;
    this.values[hashedIndex] = null;
    this.limit--;
  }
  // Quadratic probing

  #getHashedIndexQuadratically(
    key: number,
    getNextIndexForKeyValue: number | null
  ) {
    let hashedIndex = this.hash(key),
      squareIndex = 1;

    while (this.keys[hashedIndex] != getNextIndexForKeyValue) {
      hashedIndex += Math.pow(squareIndex, 2);

      hashedIndex;
      squareIndex++;
    }

    return hashedIndex;
  }

  setQuadratically(key: number, value: TValue) {
    if (this.limit >= this.size) throw "hash table is full";

    let hashedIndex = this.#getHashedIndexQuadratically(key, null);

    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
  }

  getQuadratically(key: number) {
    return this.values[this.#getHashedIndexQuadratically(key, key)];
  }

  deleteQuadratically(key: number) {
    var hashedIndex = this.#getHashedIndexQuadratically(key, key);

    this.keys[hashedIndex] = null;
    this.values[hashedIndex] = null;
    this.limit--;
  }

  // Using Double-Hashing with Linear Probing

  secondHash(hashedKey: number) {
    var R = this.size - 2;
    return R - (hashedKey % R);
  }

  doubleHash(key: number) {
    if (!Number.isInteger(key)) throw "must be int"; // check if int
    return this.secondHash(key % this.size);
  }

  #getHashedIndexForDoubleHash(
    key: number,
    getNextIndexForKeyValue: number | null
  ) {
    let hashedIndex = this.hash(key),
      squareIndex = 1;

    while (this.keys[hashedIndex] != getNextIndexForKeyValue) {
      hashedIndex += Math.pow(squareIndex, 2);

      hashedIndex;
      squareIndex++;
    }

    return hashedIndex;
  }

  setDoubleHashed(key: number, value: TValue) {
    if (this.limit >= this.size) throw "hash table is full";

    let hashedIndex = this.#getHashedIndexForDoubleHash(key, null);

    this.keys[hashedIndex] = key;
    this.values[hashedIndex] = value;
    this.limit++;
  }

  getDoubleHashed(key: number) {
    return this.values[this.#getHashedIndexForDoubleHash(key, key)];
  }

  deleteDoubleHashed(key: number) {
    var hashedIndex = this.#getHashedIndexForDoubleHash(key, key);

    this.keys[hashedIndex] = null;
    this.values[hashedIndex] = null;
    this.limit--;
  }
}

var exampletable = new HashTable(13);
exampletable.setQuadratically(7, "hi");
exampletable.setQuadratically(20, "hello");
exampletable.setQuadratically(33, "sunny");
exampletable.setQuadratically(46, "weather");
exampletable.setQuadratically(59, "wow");
exampletable.setQuadratically(72, "forty");
exampletable.setQuadratically(85, "happy");
exampletable.setQuadratically(98, "sad");

/*
    Here is the result:
    Keys:
    [ 85, 98, null, null, null, null, null, 7, 20, 33, 46, 59, 72 ]
    
    Values:
    [ 'happy', 'sad', null, null, null, null, null, 'hi', 'hello',
    'sunny', 'weather', 'wow', 'forty' ]
  */

/* 
Here is the result:
Keys:
[ null, null, null, 85, 72, null, 98, 7, 20, null, 59, 46, 33 ]

Values:
[ null, null, null, 'happy', 'forty', null, 'sad', 'hi', 'hello',
null, 'wow', 'weather', 'sunny' ]
*/

/* 
 Here is the result:
 Keys:
 [ null, 59, 20, 85, 98, 72, null, 7, null, 46, null, 33, null ]

 Values:
 [ null, 'wow', 'hello', 'happy', 'sad', 'forty', null, 'hi', null,
 'weather', null, 'sunny', null ]
 */
