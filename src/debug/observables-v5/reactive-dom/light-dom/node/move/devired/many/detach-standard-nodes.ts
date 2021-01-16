import { detachStandardNode } from '../../standard/detach-standard-node';
import { IStandardNode } from '../../../type/is-standard-node';

export function detachStandardNodes(
  nodes: ArrayLike<IStandardNode>,
): void {
  for (let i = 0, l = nodes.length; i < l; i++) {
    detachStandardNode(nodes[i]);
  }
}
