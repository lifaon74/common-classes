import { ICompilerReturn } from '../../../../../../../../compiler-interface';

const REACTIVE_ATTRIBUTE_STANDARD_REGEXP: RegExp = new RegExp('^attr\\.(.*)$');
const REACTIVE_ATTRIBUTE_PREFIXED_REGEXP: RegExp = new RegExp('^attr-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [attr.my-attr]="'attr-value'"
 *    [attr...]="{ 'my-attr': 'attr-value' }"
 *
 *  - prefixed:
 *    bind-attr-my-attr="'attr-value'"
 *    bind-attr---="{ 'my-attr': 'attr-value' }"
 */
export function compileReactiveAttribute(
  name: string,
  value: string,
  prefixMode: boolean,
): ICompilerReturn {
  const match: RegExpExecArray | null = prefixMode
    ? REACTIVE_ATTRIBUTE_PREFIXED_REGEXP.exec(name)
    : REACTIVE_ATTRIBUTE_STANDARD_REGEXP.exec(name);

  if (match === null) {
    return null;
  } else {
    let attributeName: string = match[1];

    if (prefixMode && (attributeName === '--')) {
      attributeName = '..';
    }

    if (attributeName === '..') {
      throw new Error(`TODO`); // TODO
    }

    return compileReactiveAttributeSingle(attributeName, value);
  }
}


export function compileReactiveAttributeSingle(
  name: string,
  value: string
): string[] {
  return [
    `// reactive attribute '${ name }'`,
    `setReactiveAttribute(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

