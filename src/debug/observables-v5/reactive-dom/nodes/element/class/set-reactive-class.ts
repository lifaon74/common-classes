import { ISubscribeFunction } from '../../../../types';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { IExtractClassNamesFromAny } from './extract-class-names';


export function setReactiveClass(
  subscribe: ISubscribeFunction<boolean>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: boolean) => {
    element.classList.toggle(name, value);
  });
}

