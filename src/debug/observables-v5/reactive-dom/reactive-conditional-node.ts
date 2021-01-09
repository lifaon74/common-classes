import { ISubscribeFunction } from '../types';
import { subscribeOnce } from '../misc/helpers/subscribe-once';
import { attachNode, detachNode } from './node-state/dom-state-observer';


// export function createReactiveConditionalNode(
//   subscribe: ISubscribeFunction<boolean>,
//   createNode: () => Node,
// ): Comment {
//   const referenceNode: Comment = new Comment('ref-node');
//   // TODO move with referenceNode
//   let node: Node | null = null;
//
//   subscribeOnce(
//     nodeDestroyedListener(referenceNode),
//     subscribe((value: boolean) => {
//       if (value) {
//         if (node === null) {
//           node = createNode();
//           attachNode(node, referenceNode.parentNode as Node, referenceNode.nextSibling);
//         }
//       } else {
//         if (node !== null) {
//           detachNode(node);
//           destroyNode(node);
//           node = null;
//         }
//       }
//     })
//   );
//
//   return referenceNode;
// }

