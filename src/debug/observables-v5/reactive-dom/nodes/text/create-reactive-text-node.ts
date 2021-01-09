import { ISubscribeFunction } from '../../../types';
import { subscribeOnNodeConnectedTo } from '../../misc/subscribe-on-node-connected-to';


/**
 * A Text Node which value changes depending on a SubscribeFunction
 */
export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>,
): Text {
  const node: Text = new Text();

  subscribeOnNodeConnectedTo<string>(node, subscribe, (value: string) => {
    node.data = value;
  });

  return node;
}

