import {
  createListenerBuilderFunctions, createListenerMap
} from '../../../../../misc/event-listener/build-event-listener';
import { IStandardNode } from '../../type/is-standard-node';


const ON_NODE_ATTACHED_LISTENERS = createListenerMap<Node, boolean>();

export const {
  listener: onNodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);

export function attachStandardNode(
  node: IStandardNode,
  parentNode: Node,
  referenceNode: Node | null = null,
  move: boolean = false,
): void {
  if (node.parentNode === null) {
    parentNode.insertBefore(node, referenceNode);
    dispatchNodeAttached(node, move);
  } else {
    throw new Error(`Cannot attach a node which is already attached`);
  }
}

