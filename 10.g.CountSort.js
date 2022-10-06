// takes in an array of numbers
function countSort(array) {
  // initialize a hash and an array to store the count
  const hash = {}, countArr = [];


  // for every element in input array
  for (let i = 0; i < array.length; i++) {
    // if hash does not contain any occurrence for that element
    if (!hash[array[i]]) {
      // add occurrence as one for that element
      hash[array[i]] = 1;
    } else {
      // or else increment the occurrence value
      hash[array[i]]++;
    }
  }

  // for every key in hash table
  for (let key in hash) {
    // for as many occurrences the key has
    for (let i = 0; i < hash[key]; i++) {
      // add the key to count array
      countArr.push(parseInt(key));
    }
  }

  // return count array
  return countArr;
}

countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 2, 3]); // [1,1,1, 2,2,2,2, 3,3,3,3, 4, 6, 23,123,123]
