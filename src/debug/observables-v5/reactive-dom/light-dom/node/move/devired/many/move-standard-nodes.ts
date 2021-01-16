import { IStandardNode } from '../../../type/is-standard-node';
import { moveStandardNode } from '../../standard/move-standard-node';

export function moveStandardNodes(
  nodes: ArrayLike<IStandardNode>,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    moveStandardNode(nodes[i], parentNode, referenceNode);
  }
}
