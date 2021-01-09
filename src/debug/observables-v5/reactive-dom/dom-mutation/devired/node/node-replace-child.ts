import { detachNode } from '../../detach-node';
import { attachNodeSafe } from '../attach-node-safe';

/**
 * Equivalent of:
 *  parentNode.replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
 */
export function nodeReplaceChild<GNode extends Node>(
  parentNode: Node,
  newChild: Node,
  oldChild: GNode,
): GNode {
  if (oldChild.parentNode === parentNode) {
    attachNodeSafe(newChild, parentNode, oldChild);
    detachNode(oldChild);
  } else {
    throw new Error(`oldChild.parentNode !== parentNode`);
  }
  return oldChild;
}
