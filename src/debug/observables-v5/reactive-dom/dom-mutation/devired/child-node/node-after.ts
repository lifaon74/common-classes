import { INodeOrString, nodeOrStringAsNode } from '../node-or-string-as-node';
import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  node.after(...nodes: (Node | string)[]): void;
 */
export function nodeAfter(
  node: Node,
  nodes: INodeOrString[],
): void {
  if (node.parentNode !== null) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      attachNodeSafe(
        nodeOrStringAsNode(nodes[i]),
        node.parentNode,
        node.nextSibling,
      );
    }
  }
}
