import { detachStandardNode } from '../../../standard/detach-standard-node';
import { isStandardNode } from '../../../../type/is-standard-node';

/**
 * Equivalent of:
 *  node.remove();
 */
export function nodeRemove(
  node: Node,
): void {
  if (isStandardNode(node) && (node.parentNode !== null)) {
    detachStandardNode(node);
  }
}
