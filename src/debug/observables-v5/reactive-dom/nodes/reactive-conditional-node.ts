import { ISubscribeFunction } from '../../types';
import { ContainerNode } from './container-node';
import { uuid } from '../../misc/helpers/uuid';
import { attachNode } from '../dom-mutation/attach-node';
import { detachNode } from '../dom-mutation/detach-node';
import { subscribeOnNodeConnectedTo } from '../misc/subscribe-on-node-connected-to';


export function createReactiveConditionalNode(
  subscribe: ISubscribeFunction<boolean>,
  createNode: () => Node,
  destroy: boolean = false,
): Comment {
  const node: ContainerNode = new ContainerNode(`IF - ${ uuid() }`, true);

  let _node: Node | null = null;

  subscribeOnNodeConnectedTo<boolean>(node, subscribe, (value: boolean) => {
    if (_node === null) {
      _node = createNode();
    }
    if (value) {
      attachNode(_node, node, null);
    } else {
      detachNode(_node);
      if (destroy) {
        _node = null;
      }
    }
  });

  return node;
}

