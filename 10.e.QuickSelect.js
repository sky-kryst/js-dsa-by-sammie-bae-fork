import { partition } from "./10.d.QuickSort";

var array = [1, 3, 3, -2, 3, 14, 7, 8, 1, 2, 2];
// sorted form: [-2, 1, 1, 2, 2, 3, 3, 3, 7, 8, 14]

// takes in an array, left and right most index and the
// degree of the smallest element required
function quickSelectInPlace(Array, left, right, degree) {
  // make sure all the small elements are to the left of pivot
  // and larger elements are to the right of pivot
  // and store the index of pivot as a var
  const index = partition(Array, left, right);

  // if index is one smaller than degree
  if (index == degree - 1) {
    // return element at the index
    return Array[index];
  } else if (index > degree - 1) {
    // if index greater than one smaller than degree
    // apply & return quick select on elements left of the index
    return quickSelectInPlace(Array, left, index - 1, degree);
  } else {
    // if index less than one smaller than degree
    // apply & return quick select on elements right of the index
    return quickSelectInPlace(Array, index + 1, right, degree);
  }
}

export function medianQuickSelect(array) {
  return quickSelectInPlace(
    array,
    0,
    array.length - 1,
    Math.floor(array.length / 2)
  );
}

quickSelectInPlace(array, 0, array.length - 1, 5); // 2
// 2 - because it's the fifth smallest element
quickSelectInPlace(array, 0, array.length - 1, 10); // 7
// 7 - because it's the tenth smallest element
