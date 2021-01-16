import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IAttributeValue, setAttributeValue } from '../../../light-dom/attribute/set-attribute-value';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';

export type IReactiveAttributeValue = IAttributeValue;

export function setReactiveAttribute(
  subscribe: ISubscribeFunction<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveAttributeValue) => {
    setAttributeValue(element, name, value);
  });
}

