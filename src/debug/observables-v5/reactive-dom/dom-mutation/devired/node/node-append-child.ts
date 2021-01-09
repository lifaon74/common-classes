import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  parentNode.appendChild<T extends Node>(node: T): T;
 */
export function nodeAppendChild<GNode extends Node>(
  parentNode: Node,
  node: GNode,
): GNode {
  attachNodeSafe(node, parentNode, null);
  return node;
}
