import { ICompilerReturn } from '../../../../compiler-interface';
import { compileNode } from '../../../compile-node';

// TODO
// export function compileContainerElement(
//   node: Element,
// ): ICompilerReturn {
//   const lines: string[] = [
//     `const node = document.createElement(${JSON.stringify(node.tagName)});`,
//   ];
//   let childNode: Node | null = node.firstChild;
//   while (childNode !== null) {
//     const _lines: ICompilerReturn = compileNode(childNode);
//     if (_lines !== void 0) {
//
//     }
//     childNode = childNode.nextSibling;
//   }
//   return lines;
// }
