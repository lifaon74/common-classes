import { createListenerBuilderFunctions, createListenerMap } from '../../misc/event-listener/build-event-listener';


const ON_NODE_DETACHED_LISTENERS = createListenerMap<Node, void>();

export const {
  listener: onNodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);

export function detachNode(
  node: Node,
): void {
  if (node.parentNode === null) {
    throw new Error(`Cannot detach a node which is already detached`);
  } else {
    (node as ChildNode).remove();
    dispatchNodeDetached(node);
  }
}
