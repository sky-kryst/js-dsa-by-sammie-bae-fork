export function swap(array: Array<any>, index1: number, index2: number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
