import { ILines } from '../../../../compiler-interface';
import { isValidCSSIdentifier } from '../../../../../tokenizers/css';

const REACTIVE_CLASS_STANDARD_REGEXP: RegExp = new RegExp('^class\\.(.*)$');
const REACTIVE_CLASS_PREFIXED_REGEXP: RegExp = new RegExp('^class-(.*)');

/**
 * Syntax:
 *  - standard:
 *    [class.class-a]="boolean"
 *    [class...]="['class-a', 'class-b']"
 *
 *  - prefixed:
 *    bind-class-class-a="boolean"
 *    bind-class---="['class-a', 'class-b']"
 */
export function compileReactiveClass(
  name: string,
  value: string,
  prefixMode: boolean,
): ILines | null {
  const match: RegExpExecArray | null = prefixMode
    ? REACTIVE_CLASS_PREFIXED_REGEXP.exec(name)
    : REACTIVE_CLASS_STANDARD_REGEXP.exec(name);

  if (match === null) {
    return null;
  } else {
    let className: string = match[1];

    if (prefixMode && (className === '--')) {
      className = '..';
    }

    if ((className !== '..') && !isValidCSSIdentifier(className)) {
      throw new Error(`Invalid className '${ className }'`);
    }

    return (className === '..')
      ? compileReactiveClassList(value)
      : compileReactiveClassSingle(className, value);
  }
}

export function compileReactiveClassSingle(
  name: string,
  value: string
): ILines {
  return [
    `// reactive class '${ name }'`,
    `setReactiveClass(${ value }, node, ${ JSON.stringify(name) });`,
  ];
}

export function compileReactiveClassList(
  value: string
): ILines {
  return [
    `// reactive class list`,
    `setReactiveClassList(${ value }, node);`,
  ];
}
