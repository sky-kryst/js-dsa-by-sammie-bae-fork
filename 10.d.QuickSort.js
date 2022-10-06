import { swap } from "./Swap";

/* 
  Only sort when array length > 1
    partition:
      A function which allocates any element smaller that it's pivot to the left and larger then pivot to the right.
      It does this by incrementing the left index counter, decrementing the right index counter until an element is found
      viz. not smaller or greater than the pivot rspv.
      Compares elements at both positions, and swaps them if left is smaller than/ equal to right.
      This is because
      Does this until the left counter is < the right counter
      return the left counter which is the element to the left of the pivot

    assign the pivot to a index variable

    if the left most element is still smaller than index
      call quickSort on that sub-range

    if the right most element is still greater than index
      call quickSort on that sub-range

    This sorts all the sub-arrays rspv. and sorts the entire array as a result.
*/

// takes in an array of numbers
function quickSort(items) {
  return quickSortHelper(items, 0, items.length - 1);
}

// takes in an array, it's left and right most index
function quickSortHelper(items, left, right) {
  // declare var for storing index
  let index;
  // if array is not empty
  if (items.length > 1) {
    // assign index as result of partition
    // most probably the pivot itself
    index = partition(items, left, right);

    // if left index is still smaller than the index left of current index
    if (left < index - 1) {
      // call quicksort on the the subset of array within that range
      // this will sort the subset array in the same manner
      // it sorted the parent array
      quickSortHelper(items, left, index - 1);
    }

    // if right index is still greater than the index right of current index
    if (index < right) {
      // call quicksort on the the subset of array within that range
      quickSortHelper(items, index, right);
    }
  }
  return items;
}

// takes in an array, its left and right most index
export function partition(array, left, right) {
  // initialize pivot as the median of the array
  const pivot = array[Math.floor((right + left) / 2)];

  // as long as left is small or equal to right most index
  while (left <= right) {
    // and pivot is greater than the element at left index
    while (pivot > array[left]) {
      // increment left index
      // this will assign left index to the value that is
      // greater than the pivot on the L.H.S.
      left++;
    }
    // now while pivot is smaller than the element at right index
    while (pivot < array[right]) {
      // increment right index
      // this will assign right index to the value that is
      // smaller than the pivot on the R.H.S.
      right--;
    }
    // if the final left index is smaller or equal to final right index
    if (left <= right) {
      // swap elements at both the indices
      swap(array, left, right);
      // increment left, decrement right indices
      // this will change the indices to the next elements
      // from both ends
      // and the loop will continue to examine the remaining elements
      // in similar manner, and interchange them if required
      left++;
      right--;
    }
  }
  // return the latest value of the left index
  return left;
}

quickSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23]
