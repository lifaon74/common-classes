
/**
 * Syntax:
 *  - standard: [property]
 *  - prefixed: bind-property
 */
export function compileReactiveProperty(
  name: string,
  value: string
): string[] {
  return [
    `// reactive property '${ name }'`,
    `setReactiveProperty(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

