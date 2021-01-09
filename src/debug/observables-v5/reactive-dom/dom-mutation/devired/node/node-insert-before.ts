import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  parentNode.insertBefore<T extends Node>(node: T, referenceNode: Node | null): T;
 */
export function nodeInsertBefore<GNode extends Node>(
  parentNode: Node,
  node: GNode,
  referenceNode: Node | null,
): GNode {
  attachNodeSafe(node, parentNode, referenceNode);
  return node;
}
