import { INodeCompiler } from './node-compiler-interface';
import { ICompilerReturn } from '../compiler-interface';
import { compileDefaultNode } from './compilers/compile-default-node';

export const NODE_COMPILERS: INodeCompiler[] = [
  compileDefaultNode,
];

export function compileNode(
  node: Node,
  compilers: INodeCompiler[] = NODE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const lines: string[] | null = compilers[i](node);
    if (lines !== null) {
      return lines;
    }
  }
  return null;
}


