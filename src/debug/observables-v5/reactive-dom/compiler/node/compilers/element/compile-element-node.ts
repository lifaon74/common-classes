import { ICompilerReturn } from '../../../compiler-interface';
import { IElementNodeCompiler } from './element-compiler-interface';
import { compileDefaultElement } from './compilers/compile-default-element';

export const ELEMENT_NODE_COMPILERS: IElementNodeCompiler[] = [
  compileDefaultElement,
];

export function compileElementNode(
  node: Element,
  compilers: IElementNodeCompiler[] = ELEMENT_NODE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const lines: string[] | null = compilers[i](node);
    if (lines !== null) {
      return lines;
    }
  }
  return null;
}


