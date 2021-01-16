import { ILines } from '../../compiler-interface';
import { compileStaticTextNotEmpty } from './compile-static-text-node';
import { nullIfEmptyLines } from '../../snipets';

/**
 * Syntax: {{ variable }}
 */

const REACTIVE_TEXT_NODE_PATTERN: string = '{{(.*?)}}';
const REACTIVE_TEXT_NODE_REGEXP: RegExp = new RegExp(REACTIVE_TEXT_NODE_PATTERN, 'g');

export function compileReactiveTextNode(
  node: Text,
): ILines | null {
  return compileReactiveText(node.data);
}

/*------*/

export function compileReactiveText(
  text: string,
): ILines | null {
  const lines: ILines = [];

  REACTIVE_TEXT_NODE_REGEXP.lastIndex = 0;
  let match: RegExpExecArray | null;
  let index: number = 0;
  while ((match = REACTIVE_TEXT_NODE_REGEXP.exec(text)) !== null) {
    if (index !== match.index) {
      lines.push(...compileStaticTextNotEmpty(text.substring(index, match.index)));
    }

    lines.push(...compileReactiveTextSingle(match[1]));
    index = match.index + match[0].length;
  }

  if (index !== text.length) {
    lines.push(...compileStaticTextNotEmpty(text.substring(index)));
  }

  return nullIfEmptyLines(lines);
}

export function compileReactiveTextSingle(
  code: string,
): ILines {
  return [
    `// reactive text node`,
    `attachNode(createReactiveTextNode(${ code.trim() }), parentNode);`,
  ];
}
