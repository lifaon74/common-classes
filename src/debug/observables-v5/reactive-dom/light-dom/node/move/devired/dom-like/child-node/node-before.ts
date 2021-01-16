import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';

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
      nodeInsertBefore(
        node.parentNode,
        nodeOrStringAsNode(nodes[i]),
        node,
      );
    }
  }
}
