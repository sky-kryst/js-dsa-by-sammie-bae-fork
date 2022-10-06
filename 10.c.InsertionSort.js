/* 
  Loop through an array
    Loop backwards from current element until there is no element larger than the current element
      assign current element = element at index + 1
    the penultimate element of the last loop is the current element
  repeat for next element
*/

// takes a array of numbers
function insertionSort(items) {
  // store the length of array in a var
  const len = items.length;
  // declare vars for value under consideration,
  //
  let value, i, j;

  // loop through the array
  for (i = 0; i < len; i++) {
    // assign value as current element
    value = items[i];

    // loop through all elements L.H.S. of current element from right to left
    // until an element is smaller than the current element
    for (j = i - 1; j > -1 && items[j] > value; j--) {
      // shift the elements to right by one index
      items[j + 1] = items[j];
    }
    // assign the element to the right of last element in the loop as current element
    items[j + 1] = value;
  }
  return items;
}

insertionSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
