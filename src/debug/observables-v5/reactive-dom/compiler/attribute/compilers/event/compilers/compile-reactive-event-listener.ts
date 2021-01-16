import { ILines } from '../../../../compiler-interface';

/**
 * Syntax:
 *  - standard: (event)
 *  - prefixed: on-event
 */
export function compileReactiveEventListener(
  name: string,
  value: string,
): ILines {
  return [
    `// reactive event listener '${ name }'`,
    `setReactiveEventListener(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

