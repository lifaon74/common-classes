import { isDocumentFragment } from '../../../../type/is-document-fragment';
import { attachDocumentFragment } from '../../../fragment/attach-document-fragment';
import { isStandardNode } from '../../../../type/is-standard-node';
import { attachStandardNode } from '../../../standard/attach-standard-node';
import { moveStandardNode } from '../../../standard/move-standard-node';

/**
 * Equivalent of:
 *  parentNode.insertBefore<T extends Node>(node: T, referenceNode: Node | null): T;
 */
export function nodeInsertBefore<GNode extends Node>(
  parentNode: Node,
  node: GNode,
  referenceNode: Node | null,
): GNode {
  if (isDocumentFragment(node)) {
    attachDocumentFragment(node, parentNode, referenceNode);
  } else if (isStandardNode(node)) {
    if (node.parentNode === null) {
      attachStandardNode(node, parentNode, referenceNode);
    } else {
      moveStandardNode(node, parentNode, referenceNode);
    }
  } else {
    throw new TypeError(`Unsupported node type: ${ node.nodeType }`);
  }
  return node;
}
