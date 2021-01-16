import { IStandardNode } from '../type/is-standard-node';

export function getChildNodes(
  node: Node,
): IStandardNode[] {
  return Array.from(node.childNodes) as IStandardNode[];
}
