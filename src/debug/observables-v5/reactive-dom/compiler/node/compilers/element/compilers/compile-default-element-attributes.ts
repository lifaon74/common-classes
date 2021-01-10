import { ICompilerReturn } from '../../../../compiler-interface';
import { nullIfEmptyLines, optionalLines } from '../../../../snipets';
import { compileAttribute } from './attribute/compile-attribute';

export function compileDefaultElementAttributes(
  node: Element,
): ICompilerReturn {
  const lines: string[] = [];
  for (let i = 0, l = node.attributes.length; i < l; i++) {
    lines.push(...optionalLines(compileAttribute(node.attributes.item(i) as Attr)));
  }
  return nullIfEmptyLines(lines);
}
