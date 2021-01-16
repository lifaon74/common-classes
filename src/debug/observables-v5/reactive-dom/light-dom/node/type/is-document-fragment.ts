export function isDocumentFragment(
  node: Node,
): node is DocumentFragment {
  return (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);
}
