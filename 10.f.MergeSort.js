// takes an array of numbers
function mergeSort(array) {
  // if the array has less than two elements
  if (array.length < 2) {
    // return the array
    return array;
  }

  // initialize the midpoint, left and right array from the midpoint
  const midpoint = Math.floor(array.length / 2),
    leftArray = array.slice(0, midpoint),
    rightArray = array.slice(midpoint);

  // call and return merge on mergeSort of left and right array
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

// takes two arrays to merge
function merge(leftA, rightA) {
  // initialize resultant array, and left and right index to 0
  const results = [],
    leftIndex = 0,
    rightIndex = 0;

  // loop until left index is smaller than length of left array
  // and right index is smaller than length of right array
  while (leftIndex < leftA.length && rightIndex < rightA.length) {
    // if element at left index is smaller than element at right index
    if (leftA[leftIndex] < rightA[rightIndex]) {
      // push element to result
      // increment left index
      results.push(leftA[leftIndex++]);
    } else {
      // if element at right index is smaller than element at left index
      // push element to result
      // increment right index
      results.push(rightA[rightIndex++]);
    }
  }
  var leftRemains = leftA.slice(leftIndex),
    rightRemains = rightA.slice(rightIndex);

  // add remaining to resultant array
  return results.concat(leftRemains).concat(rightRemains);
}

mergeSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
