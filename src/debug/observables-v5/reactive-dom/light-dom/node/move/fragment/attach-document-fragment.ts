import { IStandardNode } from '../../type/is-standard-node';
import { moveStandardNode } from '../standard/move-standard-node';
import { dispatchNodeDetached } from '../standard/detach-standard-node';
import { dispatchNodeAttached } from '../standard/attach-standard-node';

export function attachDocumentFragment(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  return attachDocumentFragmentAccurate(
    fragment,
    parentNode,
    referenceNode,
  );
}

export function attachDocumentFragmentAccurate(
  fragment: DocumentFragment,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  let node: IStandardNode | null;
  while ((node = fragment.firstChild as IStandardNode | null) !== null) {
    moveStandardNode(node, parentNode, referenceNode);
  }
}

// export function attachDocumentFragmentLessAccurate(
//   node: DocumentFragment,
//   parentNode: Node,
//   referenceNode: Node | null = null,
// ): void {
//   const nodes: Node[] = Array.from(node.childNodes);
//   parentNode.insertBefore(node, referenceNode);
//   for (let i = 0, l = nodes.length; i < l; i++) {
//     dispatchNodeDetached(nodes[i], true); // detached from the document fragment
//     dispatchNodeAttached(nodes[i], true); // attached to its parent
//   }
// }
