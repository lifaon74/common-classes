import { INodeOrString, nodeOrStringAsNode } from '../node-or-string-as-node';
import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  node.append(...nodes: (Node | string)[]): void;
 */
export function nodeAppend(
  node: Node,
  nodes: INodeOrString[],
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    attachNodeSafe(
      nodeOrStringAsNode(nodes[i]),
      node,
      null,
    );
  }
}
