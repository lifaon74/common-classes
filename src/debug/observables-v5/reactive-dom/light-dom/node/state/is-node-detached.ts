export function isNodeDetached(
  node: Node,
): boolean {
  return (node.parentNode === null);
}
