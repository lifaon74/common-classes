import { ICompilerReturn, ILines } from '../../compiler-interface';
import { nullIfEmptyLines } from '../../snipets';
import { compileNode } from '../../node/compile-node';


export function compileDefaultNodes(
  nodes: Node[],
): ICompilerReturn {
  const lines: ILines = [];
  for (let i = 0, l = nodes.length; i < l; i++) {
    const result: ICompilerReturn = compileNode(nodes[i]);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}
