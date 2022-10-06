function binarySearchIterative(array, n) {
  var lowIndex = 0,
    highIndex = array.length - 1;

  while (lowIndex <= highIndex) {
    var midIndex = Math.floor((highIndex + lowIndex) / 2);
    if (array[midIndex] == n) {
      return midIndex;
    } else if (n > array[midIndex]) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }
  return -1;
}
console.log(binarySearchIterative([1, 2, 3, 4], 4));
console.log(binarySearchIterative([1, 2, 3, 4], 5));

function binarySearchRecursive(array, startIndex, endIndex, value) {
  if (startIndex > endIndex) {
    return false;
  }
  var middleIndex = Math.floor((startIndex + endIndex) / 2);

  if (array[middleIndex] == value) {
    return middleIndex;
  } else if (array[middleIndex] > value) {
    return binarySearchRecursive(array, startIndex, middleIndex - 1, value);
  } else {
    return binarySearchRecursive(array, middleIndex + 1, endIndex, value);
  }
}

binarySearchRecursive([-121, 2, 3, 4, 5, 71, 102], 0, 6, 4);
