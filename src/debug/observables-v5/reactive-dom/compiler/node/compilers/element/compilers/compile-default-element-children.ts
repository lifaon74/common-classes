import { ICompilerReturn } from '../../../../compiler-interface';
import { compileNode } from '../../../compile-node';
import { nullIfEmptyLines, optionalLines, scopeLines } from '../../../../snipets';

export function compileDefaultElementChildren(
  node: Element,
): ICompilerReturn {
  const lines: string[] = [];
  let childNode: Node | null = node.firstChild;
  while (childNode !== null) {
    lines.push(...optionalLines(compileNode(childNode), scopeLines));
    childNode = childNode.nextSibling;
  }
  return nullIfEmptyLines(lines);
}
