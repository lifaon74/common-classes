import { attachStandardNode } from './attach-standard-node';
import { detachStandardNode } from './detach-standard-node';
import { IStandardNode } from '../../type/is-standard-node';

export function moveStandardNode(
  node: IStandardNode,
  parentNode: Node,
  referenceNode?: Node | null,
): void {
  detachStandardNode(node, true);
  attachStandardNode(node, parentNode, referenceNode, true);
}


