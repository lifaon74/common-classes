import { ILines } from '../../../../compiler-interface';

/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */
export function compileReactiveProperty(
  name: string,
  value: string
): ILines {
  return [
    `// reactive property '${ name }'`,
    `setReactiveProperty(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

