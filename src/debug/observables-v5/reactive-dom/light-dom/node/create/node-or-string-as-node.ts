import { createTextNode } from './create-text-node';

export type INodeOrString = Node | string;

export function nodeOrStringAsNode(node: INodeOrString): Node {
  return (typeof node === 'string')
    ? createTextNode(node)
    : node;
}
