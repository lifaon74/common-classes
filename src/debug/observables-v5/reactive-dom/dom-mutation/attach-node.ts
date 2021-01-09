import { createListenerBuilderFunctions, createListenerMap } from '../../misc/event-listener/build-event-listener';
import { dispatchNodeDetached } from './detach-node';


const ON_NODE_ATTACHED_LISTENERS = createListenerMap<Node, void>();

export const {
  listener: onNodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);

export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNode: Node | null,
): void {
  if (node.parentNode === null) {
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const nodes: Node[] = Array.from(node.childNodes);
      parentNode.insertBefore(node, referenceNode);
      for (let i = 0, l = nodes.length; i < l; i++) {
        dispatchNodeDetached(nodes[i]); // detached from the document fragment
        dispatchNodeAttached(nodes[i]); // attached to its parent
      }
    } else {
      parentNode.insertBefore(node, referenceNode);
      dispatchNodeAttached(node);
    }
  } else {
    throw new Error(`Cannot attach a node which is already attached`);
  }
}

