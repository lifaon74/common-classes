import { ICompilerReturn } from '../../../../compiler-interface';
import { compileNode } from '../../../compile-node';
import { nullIfEmptyLines, optionalLines, scopeLines } from '../../../../snipets';
import { INodeCompiler } from '../../../node-compiler-interface';

export function compileDefaultElementChildren(
  node: Element,
  compiler: INodeCompiler = compileNode,
): ICompilerReturn {
  const lines: string[] = [];
  let childNode: Node | null = node.firstChild;
  while (childNode !== null) {
    lines.push(...optionalLines(compiler(childNode), scopeLines));
    childNode = childNode.nextSibling;
  }
  return nullIfEmptyLines(lines);
}
