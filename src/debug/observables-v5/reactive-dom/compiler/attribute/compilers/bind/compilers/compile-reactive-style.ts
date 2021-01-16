import { ILines } from '../../../../compiler-interface';

const REACTIVE_STYLE_STANDARD_REGEXP: RegExp = new RegExp('^style\\.(.*)$');
const REACTIVE_STYLE_PREFIXED_REGEXP: RegExp = new RegExp('^style-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [style.font-size]="'12px'"
 *    [style...]="{ color: 'blue' }"
 *
 *  - prefixed:
 *    bind-style-font-size="'12px'"
 *    bind-style---="{ color: 'blue' }"
 */
export function compileReactiveStyle(
  name: string,
  value: string,
  prefixMode: boolean,
): ILines | null {
  const match: RegExpExecArray | null = prefixMode
    ? REACTIVE_STYLE_PREFIXED_REGEXP.exec(name)
    : REACTIVE_STYLE_STANDARD_REGEXP.exec(name);

  if (match === null) {
    return null;
  } else {
    let styleName: string = match[1];

    if (prefixMode && (styleName === '--')) {
      styleName = '..';
    }

    return (styleName === '..')
      ? compileReactiveStyleList(value)
      : compileReactiveStyleSingle(styleName, value);
  }
}

export function compileReactiveStyleSingle(
  name: string,
  value: string
): ILines {
  return [
    `// reactive style '${ name }'`,
    `setReactiveStyle(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

export function compileReactiveStyleList(
  value: string
): ILines {
  return [
    `// reactive style list`,
    `setReactiveStyleList(${ value }, node);`,
  ];
}
