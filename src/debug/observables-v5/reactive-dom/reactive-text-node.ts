import { ISubscribeFunction } from '../types';


export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>
): Text {
  const textNode: Text = new Text();
  // onNodeDestroyedOnce(textNode, subscribe((value: string) => {
  //   textNode.data = value;
  // }));
  return textNode;
}


