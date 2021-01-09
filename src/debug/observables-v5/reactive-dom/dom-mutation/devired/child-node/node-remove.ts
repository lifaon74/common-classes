import { detachNode } from '../../detach-node';

/**
 * Equivalent of:
 *  node.remove();
 */
export function nodeRemove(
  node: Node,
): void {
  if (node.parentNode !== null) {
    detachNode(node);
  }
}
