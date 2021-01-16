import { INodesCompiler } from './nodes-compiler-interface';
import { ICompilerReturn } from '../compiler-interface';
import { compileDefaultNodes } from './compilers/compile-default-nodes';

export const NODES_COMPILERS: INodesCompiler[] = [
  compileDefaultNodes,
];

export function compileNodes(
  nodes: Node[],
  compilers: INodesCompiler[] = NODES_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const result: ICompilerReturn = compilers[i](nodes);
    if (result !== null) {
      return result;
    }
  }
  return null;
}


