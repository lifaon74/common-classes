import { IEmitFunction } from '../../types';
import { createListenerBuilderFunctions } from '../../misc/event-listener/build-event-listener';


/** ATTACH **/

const ON_NODE_ATTACHED_LISTENERS = new WeakMap<Node, IEmitFunction<void>[]>();

export const {
  listener: nodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);

export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNope: Node | null,
): void {
  parentNode.insertBefore(node, referenceNope);
  dispatchNodeAttached(node);
}

/** DETACH **/

const ON_NODE_DETACHED_LISTENERS = new WeakMap<Node, IEmitFunction<void>[]>();

export const {
  listener: nodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);

export function detachNode(
  node: Node,
): void {
  if (node.parentNode !== null) {
    node.parentNode.removeChild(node);
    dispatchNodeDetached(node);
  }
}


/** DESTROY **/

const ON_NODE_DESTROYED_LISTENERS = new WeakMap<Node, IEmitFunction<void>[]>();
const DESTROYED_NODES = new WeakSet<Node>();

export const {
  listener: nodeDestroyedListener,
  dispatch: dispatchNodeDestroyed,
} = createListenerBuilderFunctions(ON_NODE_DESTROYED_LISTENERS);


/**
 * Flags a Node as destroyed and dispatch corresponding event.
 */
export function destroyNode(
  node: Node,
): void {
  if (DESTROYED_NODES.has(node)) {
    throw new Error(`Already destroyed`);
  } else {
    DESTROYED_NODES.add(node);
    dispatchNodeDestroyed(node);
  }
}

export function destroyNodeAndChildren(
  node: Node,
): void {
  destroyNode(node);
  let child: Node | null = node.firstChild;
  while (child !== null) {
    destroyNodeAndChildren(child);
    child = child.nextSibling;
  }
}


