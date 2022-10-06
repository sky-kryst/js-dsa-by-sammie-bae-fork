import { swap } from "./10.Swap";

/**
 * @description for every element in an array,
  swap all elements less than index+1 if L.H.S. element > R.H.S. element
 * @param {*} array
 * @returns array
 */
// takes an array of numbers
export function bubbleSort(array) {
  // for each number in the array
  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    // loop through all the elements before that element
    for (let j = 0; j <= i; j++) {
      // compare adjacent elements
      if (array[j] > array[j + 1]) {
        // and swap if L.H.S. > R.H.S
        swap(array, i, j);
      }
    }
  }

  // hence the larger element bubbles up to the right-most position
  // return the sorted array
  return array;
}

bubbleSort([6, 1, 2, 3, 4, 5]); // [1,2,3,4,5,6]
