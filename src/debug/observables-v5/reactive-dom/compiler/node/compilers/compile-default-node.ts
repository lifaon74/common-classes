import { ICompilerReturn } from '../../compiler-interface';
import { compileTextNode } from '../../text-node/compile-text-node';
import { compileElementNode } from '../../element/compile-element-node';

export function compileDefaultNode(
  node: Node,
): ICompilerReturn {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
      return compileTextNode(node as Text);
    // case Node.TEXT_NODE: {
    //   let text: string = (node as Text).data;
    //   const _node: Node | null = node.nextSibling;
    //   while ((_node !== null) && (_node.nodeType === Node.TEXT_NODE)) {
    //     text += (_node as Text).data;
    //   }
    //   return compileTextNode(new Text(text));
    // }
    case Node.COMMENT_NODE:
      return null;
    case Node.ELEMENT_NODE:
      return compileElementNode(node as Element);
    default:
      return null;
  }
}
