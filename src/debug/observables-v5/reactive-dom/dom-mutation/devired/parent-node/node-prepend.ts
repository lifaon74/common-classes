import { INodeOrString, nodeOrStringAsNode } from '../node-or-string-as-node';
import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  node.prepend(...nodes: (Node | string)[]): void;
 */
export function nodePrepend(
  node: Node,
  nodes: INodeOrString[],
): void {
  for (let i = nodes.length - 1; i >= 0; i--) {
    attachNodeSafe(
      nodeOrStringAsNode(nodes[i]),
      node,
      node.firstChild,
    );
  }
}
