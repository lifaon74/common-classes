import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';

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
      nodeInsertBefore(
        node.parentNode,
        nodeOrStringAsNode(nodes[i]),
        node.nextSibling,
      );
    }
  }
}
