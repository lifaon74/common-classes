import { ISubscribeFunction } from '../../../../types';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';

export type IReactiveAttributeValue = string | null | undefined;

export function setReactiveAttribute(
  subscribe: ISubscribeFunction<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveAttributeValue) => {
    if ((value === null) || (value === void 0)) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, value);
    }
  });
}

