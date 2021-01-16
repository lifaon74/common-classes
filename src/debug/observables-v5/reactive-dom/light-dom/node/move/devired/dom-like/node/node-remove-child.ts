import { nodeRemove } from '../child-node/node-remove';

/**
 * Equivalent of:
 *  parentNode.removeChild<T extends Node>(node: T): T;
 */
export function nodeRemoveChild<GNode extends Node>(
  parentNode: Node,
  node: GNode,
): GNode {
  if (node.parentNode === parentNode) {
    nodeRemove(node);
  }
  return node;
}
