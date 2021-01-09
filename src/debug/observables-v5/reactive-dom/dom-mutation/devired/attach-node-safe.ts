import { detachNode } from '../detach-node';
import { attachNode } from '../attach-node';

export function attachNodeSafe(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  if (node.parentNode !== null) {
    detachNode(node);
  }
  attachNode(node, parentNode, referenceNode);
}
