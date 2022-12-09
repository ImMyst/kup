/**
 * Return the array passes without duplicates based on key, returning the array
 * @param arr
 * @param key
 */
export function uniqMap<T>(arr: T[], key: keyof T) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
