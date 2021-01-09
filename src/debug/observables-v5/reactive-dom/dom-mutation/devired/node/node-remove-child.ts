import { nodeRemove } from '../child-node/node-remove';

/**
 * Equivalent of:
 *  parentNode.removeChild<T extends Node>(node: T): T;
 */
export function nodeRemoveChild<GNode extends Node>(
  parentNode: Node,
  node: GNode,
): GNode {
  nodeRemove(node);
  return node;
}
