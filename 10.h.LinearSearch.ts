function linearSearch(array, n) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == n) {
      return true;
    }
  }
  return false;
}

console.log(linearSearch([1, 2, 3, 4], 4));
console.log(linearSearch([1, 2, 3, 4], 5));
