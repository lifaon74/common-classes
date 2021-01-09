import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { TOP_PARENT_NODE } from './top-parent-node';
import { onNodeConnectedToWithImmediate } from '../dom-mutation/on-node-connected-to';

export function subscribeOnNodeConnectedTo<GValue>(
  node: Node,
  subscribe: ISubscribeFunction<GValue>,
  emit: IEmitFunction<GValue>,
  topParentNode: Node = TOP_PARENT_NODE,
): void {
  let unsubscribe: IUnsubscribeFunction;
  onNodeConnectedToWithImmediate(node, topParentNode)((connected: boolean) => {
    if (connected) {
      unsubscribe = subscribe(emit);
    } else if (unsubscribe !== void 0){
      unsubscribe();
    }
  });
}
