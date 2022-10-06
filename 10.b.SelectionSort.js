import { swap } from "./Swap";

/* 
  Loop through the array
    store the index of current element in a var
    loop through array element_index + 1 till end
      if any element is < current element, change currentMinIndex to that index, complete the loop
      if minIndex!==currentIndex, swap both elements
  move to next element
 */

// takes an array of numbers
export function selectionSort(items) {
  // store the length of the array in a var
  const len = items.length;
  // declare a var to store the index of min value of an array
  let minIndex;

  // loop through the array
  for (let i = 0; i < len; i++) {
    // assign min as current index
    minIndex = i;
    // loop through elements R.H.S. of current index
    for (j = i + 1; j < len; j++) {
      // compare every element with the element under consideration
      if (items[j] < items[minIndex]) {
        // if smaller, assign minIndex as index of the element
        min = j;
      }
    }

    // if minIndex is not equal to index under consideration
    if (i != minIndex) {
      // swap minIndex and current index
      swap(items, i, min);
    }
  }

  return items;
}

selectionSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
