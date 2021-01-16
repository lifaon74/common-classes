import { ICompilerReturn } from '../compiler-interface';
import { createElementNode } from '../../light-dom/node/create/create-element-node';
import { compileNodes } from '../nodes/compile-nodes';


export function compileHTML(
  html: string,
): ICompilerReturn {
  const container: HTMLElement = createElementNode('div');
  container.innerHTML = html;
  return compileNodes(Array.from(container.childNodes));
}
