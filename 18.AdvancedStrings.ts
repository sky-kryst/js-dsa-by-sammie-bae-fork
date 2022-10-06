type TTrieNodeChildren = { [x: string]: TrieNode };

class TrieNode {
  #children: TTrieNodeChildren = {};
  #endOfWord = false;

  get children() {
    return this.#children;
  }

  addPairToChildren(key: string, value: TrieNode) {
    this.#children[key] = value;
  }

  get endOfWord() {
    return this.#endOfWord;
  }

  set endOfWord(value: boolean) {
    this.#endOfWord = value;
  }
}

/**
  @class Trie
  @method {@link insert}
  @method {@link search}
  @method {@link delete}
 */
class Trie {
  #root = new TrieNode();

  /**
    Take a string to store in trie

    Create a variable to store the trie to traverse
    and assign root to it

    Keep looping through every character in the string 

    -And assign it's value( a trie) from variable as the new value of the variable

    -If value for that character does not exists in variable

    --Create a new trie node and add it as value to the character in variable

    When the whole word is traversed, set the endOfWord of the variable to true
   */
  insert(word: string) {
    let current = this.#root;
    for (let i = 0; i < word.length; i++) {
      const ch = word.charAt(i);
      let node = current.children[ch];
      if (node == null) {
        node = new TrieNode();
        current.children[ch] = node;
      }
      current = node;
    }
    current.endOfWord = true; //mark the current nodes endOfWord as true
  }

  /**
    @description To search a given string exists as a subset of corresponding trie
    @pseudocode
    Take a string to search in trie

    Create a variable to store the trie to traverse
    and assign root to it

    Keep looping through every character in the string    
    
    -And assign it's value( a trie) from variable as the new value of the variable

    -If value for that character does not exists in variable

    --return false

    return endOfWord of current variable
   */
  search(word: string) {
    let current = this.#root;
    for (let i = 0; i < word.length; i++) {
      const ch = word.charAt(i);
      let node = current.children[ch];
      if (node == null) {
        return false;
      }
      current = node;
    }
    return current.endOfWord;
  }

  /**
    @description Deletes all the nodes from trie that belong to the subset of the word and do not have children

    @pseudocode
    Take a string to search in trie

    Initialize a current variable and index

    Assign current to root and index to 0

    Loop through all the characters of the word

    -store the character at that index and the character's children from current in a node

    -if node does not exists

    --return false, so as to indicate no need to delete

    -do the same thing for current node and index + 1

    if that returns true that means only the words in the characters are there in the children

    -then delete the character from current

    -and return if other children of the current node are empty, so as to delete the current node as well

    or else return false    

    if end of the word is reached

    -and if endOfWord is not true
     --return false

     -or set endOfWord to false, 
   */
  delete(word: string) {
    this.#deleteRecursively(this.#root, word, 0);
  }

  #deleteRecursively(current: TrieNode, word: string, index: number) {
    if (index == word.length) {
      //when end of word is reached only delete if currrent.endOfWord is true.
      if (!current.endOfWord) {
        return false;
      }
      current.endOfWord = false;
      //if current has no other mapping then return true
      return Object.keys(current.children).length == 0;
    }
    const ch = word.charAt(index),
      node = current.children[ch];
    if (node == null) {
      return false;
    }
    var shouldDeleteCurrentNode = this.#deleteRecursively(
      node,
      word,
      index + 1
    );

    // if true is returned then
    // delete the mapping of character and trienode reference from map.
    if (shouldDeleteCurrentNode) {
      delete current.children[ch];
      //return true if no mappings are left in the map.
      return Object.keys(current.children).length == 0;
    }
    return false;
  }
}

var trie = new Trie();
trie.insert("sammie");
trie.insert("simran");
trie.search("simran"); // true
trie.search("fake"); // false
trie.search("sam"); // false

var trie1 = new Trie();
trie1.insert("sammie");
trie1.insert("simran");
trie1.search("simran"); // true
trie1.delete("sammie");
trie1.delete("simran");
trie1.search("sammie"); // false
trie1.search("simran"); // false

// Boyer–Moore String Search

function buildBadMatchTable(str: string) {
  let tableObj: { [x: string]: number } = {},
    strLength = str.length - 1;
  for (let i = 0; i < strLength; i++) {
    tableObj[str[i]] = strLength - i;
  }
  if (tableObj[str[strLength]] == undefined) {
    tableObj[str[strLength]] = str.length;
  }
  return tableObj;
}
buildBadMatchTable("data");
// {d: 3, a: 2, t: 1}
buildBadMatchTable("struct");
// {s: 5, t: 4, r: 3, u: 2, c: 1}
buildBadMatchTable("roi");
// {r: 2, o: 1, i: 3}
buildBadMatchTable("jam");
// {j: 2, a: 1, m: 3}

function boyerMoore(str: string, pattern: string) {
  let badMatchTable = buildBadMatchTable(pattern),
    // to store the number of characters skipped
    offset = 0,
    patternLastIndex = pattern.length - 1,
    // to store the max no. of characters than can be skipped
    maxOffset = str.length - pattern.length;

  // loop till max offset is reached
  while (offset <= maxOffset) {
    let scanIndex = 0;

    // this block determines if all the characters in a string are matched
    // if the first index of the pattern and string matches, check all the subsequent indices
    while (pattern[scanIndex] == str[scanIndex + offset]) {
      if (scanIndex == patternLastIndex) {
        // found at this index
        return offset;
      }
      scanIndex++;
    }

    const badMatchString = str[offset + patternLastIndex];

    if (badMatchTable[badMatchString]) {
      // increase the offset if it exists
      offset += badMatchTable[badMatchString];
    } else {
      offset += 1;
    }
  }
  return -1;
}
boyerMoore("jellyjam", "jelly");
// 5. indicates that the pattern starts at index 5
boyerMoore("jellyjam", "jelly");
// 0. indicates that the pattern starts at index 0
boyerMoore("jellyjam", "sam");
// -1. indicates that the pattern does not exist

function longestPrefix(str: string) {
  // prefix array is created
  var prefix = new Array(str.length);
  var maxPrefix = 0;
  // start the prefix at 0
  prefix[0] = 0;
  for (var i = 1; i < str.length; i++) {
    // decrement the prefix value as long as there are mismatches
    while (str.charAt(i) !== str.charAt(maxPrefix) && maxPrefix > 0) {
      maxPrefix = prefix[maxPrefix - 1];
    }
    // strings match, can update it
    if (str.charAt(maxPrefix) === str.charAt(i)) {
      maxPrefix++;
    }
    // set the prefix
    prefix[i] = maxPrefix;
  }
  return prefix;
}
console.log(longestPrefix("ababaca")); // [0, 0, 1, 2, 3, 0, 1]

function KMP(str: string, pattern: string) {
  // build the prefix table
  var prefixTable = longestPrefix(pattern),
    patternIndex = 0,
    strIndex = 0;
  while (strIndex < str.length) {
    if (str.charAt(strIndex) != pattern.charAt(patternIndex)) {
      // Case 1: the characters are different
      if (patternIndex != 0) {
        // use the prefix table if possible
        patternIndex = prefixTable[patternIndex - 1];
      } else {
        // increment the str index to next character
        strIndex++;
      }
    } else if (str.charAt(strIndex) == pattern.charAt(patternIndex)) {
      // Case 2: the characters are same
      strIndex++;
      patternIndex++;
    }
    // found the pattern
    if (patternIndex == pattern.length) {
      return true;
    }
  }
  return false;
}
KMP("ababacaababacaababacaababaca", "ababaca"); //
true;
KMP("sammiebae", "bae"); //
true;
KMP("sammiebae", "sammie"); //
true;
KMP("sammiebae", "sammiebaee"); // false

class RabinKarpSearch {
  #prime = 101;
  rabinkarpFingerprintHash(str: string, endLength: number) {
    if (endLength == null) endLength = str.length;
    var hashInt = 0;
    for (var i = 0; i < endLength; i++) {
      hashInt += str.charCodeAt(i) * Math.pow(this.#prime, i);
    }
    return hashInt;
  }
  recalculateHash(
    str: string,
    oldIndex: number,
    newIndex: number,
    oldHash: number,
    patternLength: number
  ) {
    if (patternLength == null) patternLength = str.length;
    var newHash = oldHash - str.charCodeAt(oldIndex);
    newHash = Math.floor(newHash / this.#prime);
    newHash +=
      str.charCodeAt(newIndex) * Math.pow(this.#prime, patternLength - 1);
    return newHash;
  }
  strEquals(
    str1: string,
    startIndex1: number,
    endIndex1: number,
    str2: string,
    startIndex2: number,
    endIndex2: number
  ) {
    if (endIndex1 - startIndex1 != endIndex2 - startIndex2) {
      return false;
    }
    while (startIndex1 <= endIndex1 && startIndex2 <= endIndex2) {
      if (str1[startIndex1] != str2[startIndex2]) {
        return false;
      }
      startIndex1++;
      startIndex2++;
    }
    return true;
  }
  rabinkarpSearch(str: string, pattern: string) {
    var T = str.length,
      W = pattern.length,
      patternHash = this.rabinkarpFingerprintHash(pattern, W),
      textHash = this.rabinkarpFingerprintHash(str, W);

    for (var i = 1; i <= T - W + 1; i++) {
      if (
        patternHash == textHash &&
        this.strEquals(str, i - 1, i + W - 2, pattern, 0, W - 1)
      ) {
        return i - 1;
      }
      if (i < T - W + 1) {
        textHash = this.recalculateHash(str, i - 1, i + W - 1, textHash, W);
      }
    }

    return -1;
  }
}
var rks = new RabinKarpSearch();
rks.rabinkarpFingerprintHash("sammie"); // 1072559917336
rks.rabinkarpFingerprintHash("zammie"); // 1072559917343
rks.rabinkarpFingerprintHash("sa"); // 9912
rks.rabinkarpFingerprintHash("am"); // 11106
var oldHash = rks.rabinkarpFingerprintHash("sa"); // 9912
rks.recalculateHash("same", 0, 2, oldHash, "sa".length); //  11106

var rks = new RabinKarpSearch();
rks.rabinkarpSearch("SammieBae", "as"); // -1
rks.rabinkarpSearch("SammieBae", "Bae"); // 6
rks.rabinkarpSearch("SammieBae", "Sam"); // 0
