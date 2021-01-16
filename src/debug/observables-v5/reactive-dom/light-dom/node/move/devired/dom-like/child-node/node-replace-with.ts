import { INodeOrString, nodeOrStringAsNode } from '../../../../create/node-or-string-as-node';
import { nodeInsertBefore } from '../node/node-insert-before';
import { nodeRemove } from './node-remove';

/**
 * Equivalent of:
 *  node.replaceWith(...nodes: (Node | string)[]): void;
 */
export function nodeReplaceWith(
  node: Node,
  nodes: INodeOrString[],
): void {
  if (node.parentNode !== null) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      nodeInsertBefore(
        node.parentNode,
        nodeOrStringAsNode(nodes[i]),
        node
      );
    }
    nodeRemove(node);
  }
}
