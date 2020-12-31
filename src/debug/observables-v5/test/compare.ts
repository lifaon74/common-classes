export interface IEqualsFunction<GValue = any> {
  (a: GValue, b: GValue): boolean;
}

export function strictEquals(a: any, b: any): boolean {
  return a === b;
}

/**
 * Compares 'a' and 'b'
 */
export function equals(a: any, b: any): boolean {
  return Object.is(a, b)
    || (JSON.stringify(a) === JSON.stringify(b));
}

export function arrayEquals<GValue>(
  a: ArrayLike<GValue>,
  b: ArrayLike<GValue>,
  equalsFunction: IEqualsFunction<GValue> = strictEquals
): boolean {
  const lengthA: number = a.length;
  if (lengthA === b.length) {
    for (let i = 0; i < lengthA; i++) {
      if (!equalsFunction(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
