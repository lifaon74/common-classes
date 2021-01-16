import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';

/**
 * Equivalent of:
 *  node.prepend(...nodes: (Node | string)[]): void;
 */
export function nodePrepend(
  node: Node,
  nodes: INodeOrString[],
): void {
  for (let i = nodes.length - 1; i >= 0; i--) {
    nodeInsertBefore(
      node,
      nodeOrStringAsNode(nodes[i]),
      node.firstChild,
    );
  }
}
