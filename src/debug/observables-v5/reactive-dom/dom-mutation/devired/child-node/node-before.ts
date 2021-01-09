import { INodeOrString, nodeOrStringAsNode } from '../node-or-string-as-node';
import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  node.before(...nodes: (Node | string)[]): void;
 */
export function nodeBefore(
  node: Node,
  nodes: INodeOrString[],
): void {
  if (node.parentNode !== null) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      attachNodeSafe(
        nodeOrStringAsNode(nodes[i]),
        node.parentNode,
        node,
      );
    }
  }
}
