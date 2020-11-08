import { SuperIterator } from './sync/class/iterator-class';

export async function debugTraitIterator() {
  console.log('debugTraitIterator');

  const testMethods = () => {
    const iterable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // TODO continue here => implement more Iterator methods

    (window as any).SuperIterator = SuperIterator;

    const r = SuperIterator.fromIterable(iterable)
        // .asIndexedPair() // [[0, 0], [1, 1], ....]
        .drop(3) // [3, 4, ..., 9]
      // .filter((value: number) => (value > 1)) // [2, 3, ...]
      // .map((value: number) => (value * 2)) // [0, 2, 4, ..., 18]
      // .take(7) // [0, 1, ..., 6]
      // .reduce((sum: number, value: number) => (sum + value), 0) // 45
      // .toArray() // [0, 1, ..., 9]
      // .forEach((value: any) => console.log(value)) // 0, 1, 2, ...
      // .some((value: number) => (value > 5)) // true
      // .every((value: number) => (value > 5)) // false
      // .find((value: number) => (value > 5)) // 6
    ;
    console.log(r);
    console.log(Array.from(r as any));
  };

  // testImplementation();
  testMethods();
}

