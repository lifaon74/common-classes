import { ICompilerReturn } from '../compiler-interface';
import { IElementNodeCompiler } from './element-compiler-interface';
import { compileDefaultElement } from './compilers/compile-default-element';
import { compileContainerElement } from './compilers/container/compile-container-element';

export const ELEMENT_NODE_COMPILERS: IElementNodeCompiler[] = [
  // compileContainerElement,
  compileDefaultElement,
];

export function compileElementNode(
  node: Element,
  compilers: IElementNodeCompiler[] = ELEMENT_NODE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const result: ICompilerReturn = compilers[i](node);
    if (result !== null) {
      return result;
    }
  }
  return null;
}


