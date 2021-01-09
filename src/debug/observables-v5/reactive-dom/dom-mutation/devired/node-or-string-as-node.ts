export type INodeOrString = Node | string;

export function nodeOrStringAsNode(node: INodeOrString): Node {
  return (typeof node === 'string')
    ? new Text(node)
    : node;
}
