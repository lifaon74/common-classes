/**
 * Converts a string (looking like a number) into a real number.
 * INFO: percents are allowed
 */
export function ParseNumberLikeValue(input: string, min: number, max: number): number {
  input = input.trim();
  let number: number = parseFloat(input);
  if (Number.isNaN(number)) {
    throw new Error(`Invalid number: ${ input }`);
  } else {
    if (input.endsWith('%')) {
      number *= max / 100;
    }

    if ((min <= number) && (number <= max)) {
      return number;
    } else {
      throw new RangeError(`Invalid range [${ min }-${ max }] for number ${ number }`);
    }
  }
}

