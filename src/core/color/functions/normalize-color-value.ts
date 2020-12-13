/**
 * Ensures that value is a number in the range [0, 1]
 */
export function NormalizeColorValue(value: number, name: string): number {
  if (typeof value === 'number') {
    if ((0 <= value) && (value <= 1)) {
      return value;
    } else {
      throw new RangeError(`Expected '${ name }' in the range [0, 1]`);
    }
  } else {
    throw new TypeError(`Expected number as '${ name }'`);
  }
}
