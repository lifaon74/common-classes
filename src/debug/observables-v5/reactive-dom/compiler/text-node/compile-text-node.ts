import { ICompilerReturn } from '../compiler-interface';
import { ITextNodeCompiler } from './text-node-compiler-interface';
import { compileStaticTextNode } from './compilers/compile-static-text-node';
import { compileReactiveTextNode } from './compilers/compile-reactive-text-node';

export const TEXT_NODE_COMPILERS: ITextNodeCompiler[] = [
  compileReactiveTextNode,
  compileStaticTextNode,
];

export function compileTextNode(
  node: Text,
  compilers: ITextNodeCompiler[] = TEXT_NODE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const result: ICompilerReturn = compilers[i](node);
    if (result !== null) {
      return result;
    }
  }
  return null;
}


