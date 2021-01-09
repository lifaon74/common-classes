import { ISubscribeFunction, IUnsubscribeFunction } from '../types';
import { onNodeConnectedTo } from './node-state/dom-state-observer';


export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>
): Text {
  const textNode: Text = new Text();

  let unsubscribe: IUnsubscribeFunction;

  onNodeConnectedTo(textNode, document.body)((connected: boolean) => {
    if (connected) {
      console.log('connected');
      unsubscribe = subscribe((value: string) => {
        textNode.data = value;
      });
    } else {
      console.log('disconnected');
      unsubscribe();
    }
  });

  return textNode;
}

export function createStaticTextNode(
  value: string
): Text {
  const textNode: Text = new Text();
  // onNodeDestroyedOnce(textNode, subscribe((value: string) => {
  //   textNode.data = value;
  // }));
  return new Text(value);
}
