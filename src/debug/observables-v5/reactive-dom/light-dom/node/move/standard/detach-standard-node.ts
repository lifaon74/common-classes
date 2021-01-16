import {
  createListenerBuilderFunctions, createListenerMap
} from '../../../../../misc/event-listener/build-event-listener';
import { IStandardNode } from '../../type/is-standard-node';


const ON_NODE_DETACHED_LISTENERS = createListenerMap<Node, boolean>();

export const {
  listener: onNodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);

export function detachStandardNode(
  node: IStandardNode,
  move: boolean = false,
): void {
  if (node.parentNode === null) {
    throw new Error(`Cannot detach a node which is already detached`);
  } else {
    (node as ChildNode).remove();
    dispatchNodeDetached(node, move);
  }
}
