
export function getChildNodes(
  node: Node,
): ChildNode[] {
  return Array.from(node.childNodes) as ChildNode[];
}
