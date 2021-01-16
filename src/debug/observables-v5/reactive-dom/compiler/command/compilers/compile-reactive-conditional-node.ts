import { indentLines } from '../../snipets';
import { IInjectLines, ILines } from '../../compiler-interface';

export const REACTIVE_CONDITIONAL_NODE_REGEXP: RegExp = new RegExp('^if(?:-((?:\\d+)|(?:cache)))?$');

/**
 * Syntax:
 *  - standard: *if, *if-cache, *if-100
 */
export function compileReactiveConditionalNode(
  name: string,
  value: string,
): IInjectLines | null {
  const match: RegExpExecArray | null = REACTIVE_CONDITIONAL_NODE_REGEXP.exec(name);
  if (match === null) {
    return null;
  } else {
    const ifOption: string = match[1];
    let destroyTimeout: number;
    if (ifOption === void 0) {
      destroyTimeout = 0;
    } else if (ifOption === 'cache') {
      destroyTimeout = Number.POSITIVE_INFINITY;
    } else {
      destroyTimeout = parseInt(ifOption, 10);
    }
    return compileReactiveConditionalNodeSingle(name, value);
  }
}

export function compileReactiveConditionalNodeSingle(
  name: string,
  value: string,
): IInjectLines {
  return (lines: ILines): ILines => {
    return [
      `// command *IF`,
      `const node = createReactiveConditionalNode(${ value }, () => {`,
      ...indentLines([
        `const parentNode = createDocumentFragment()`,
        ...lines,
        `return parentNode;`,
      ]),
      `});`,
    ];
  };
}
