import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { createListenerBuilderFunctions, createListenerMap } from '../../misc/event-listener/build-event-listener';
import { noop } from '../../misc/helpers/noop';


/** ATTACH **/

const ON_NODE_ATTACHED_LISTENERS = createListenerMap<Node, void>();

export const {
  listener: onNodeAttachedListener,
  dispatch: dispatchNodeAttached,
} = createListenerBuilderFunctions(ON_NODE_ATTACHED_LISTENERS);

export function attachNode(
  node: Node,
  parentNode: Node,
  referenceNope: Node | null,
): void {
  parentNode.insertBefore(node, referenceNope);
  dispatchNodeAttached(node);
}

/** DETACH **/

const ON_NODE_DETACHED_LISTENERS = createListenerMap<Node, void>();

export const {
  listener: onNodeDetachedListener,
  dispatch: dispatchNodeDetached,
} = createListenerBuilderFunctions(ON_NODE_DETACHED_LISTENERS);

export function detachNode(
  node: Node,
): void {
  if (node.parentNode !== null) {
    node.parentNode.removeChild(node);
    dispatchNodeDetached(node);
  }
}

/** CONNECTED **/


// export function onNodeConnectedTo(
//   node: Node,
//   parentNode: Node = document,
// ): ISubscribeFunction<boolean> {
//   // const listener: ISubscribeFunction<void> = onNodeAttachedListener(node);
//   return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
//     let running: boolean = true;
//
//     if (parentNode.contains(node)) {
//       emit(true);
//     } else {
//       emit(false);
//       let _node: Node = node;
//       while (_node.parentNode !== null) {
//         _node = _node.parentNode;
//       }
//
//       let unsubscribe: IUnsubscribeFunction = onNodeAttachedListener(_node)((): void => {
//         unsubscribe();
//         unsubscribe = onNodeConnectedTo(_node, );
//       });
//     }
//
//
//     let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
//
//     // const clearUnsubscribeFunctions = () => {
//     //   for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
//     //     _unsubscribeFunctions[i]();
//     //   }
//     // };
//
//     let _node: Node = node;
//     let _parentNode: Node | null = _node.parentNode;
//     let index: number = 0;
//
//     // for each parents, until we find parentNode or null
//     while ((_parentNode !== null) && (_parentNode !== parentNode)) {
//       // if any of the parents becomes detached, the node state change
//       _unsubscribeFunctions.push(
//         onNodeDetachedListener(_node)((): void => {
//           // TODO
//         })
//       );
//       index++;
//       _node = _parentNode;
//       _parentNode = _node.parentNode;
//     }
//
//
//     if (_parentNode === null) {
//       // await until the parent become attached
//       onNodeAttachedListener(_node)((): void => {
//         // change(emitDisconnect);
//       });
//     } else {
//       // TODO the node is attached to its parent
//     }
//
//
//
//
//
//     // const change = (emitDisconnect: boolean) => {
//     //   if (parentNode.contains(node)) {
//     //     emit(true);
//     //
//     //     let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
//     //
//     //     clear = () => {
//     //       for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
//     //         _unsubscribeFunctions[i]();
//     //       }
//     //     };
//     //
//     //     // if any of its parents is detached, the node is disconnected
//     //     let _node: Node | null = node;
//     //     while (_node !== null) {
//     //       _unsubscribeFunctions.push(
//     //         onNodeDetachedListener(_node)((): void => {
//     //           clear();
//     //           if (running) {
//     //             change(true);
//     //           }
//     //         })
//     //       );
//     //       _node = _node.parentNode;
//     //     }
//     //   } else {
//     //     if (emitDisconnect) {
//     //       emit(false);
//     //     }
//     //
//     //     let _node: Node = node;
//     //     while (_node.parentNode !== null) {
//     //       _node = _node.parentNode;
//     //     }
//     //
//     //     clear = onNodeAttachedListener(_node)((): void => {
//     //       change(emitDisconnect);
//     //     });
//     //   }
//     // }
//     //
//     // change(true);
//
//     return (): void => {
//       if (!running) {
//         running = false;
//       }
//     };
//   };
// }
//


// export function untilNodeConnectedTo(
//   node: Node,
//   parentNode: Node = document,
//   callback: () => void,
// ): IUnsubscribeFunction {
//   if (parentNode.contains(node)) {
//     callback();
//     return noop;
//   } else {
//     let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
//     let _unsubscribeAttachListener: IUnsubscribeFunction;
//
//     let _node: Node = node;
//     let _parentNode: Node | null = _node.parentNode;
//     let _index: number = 0;
//
//     // for each parents, until we find parentNode or null
//     while ((_parentNode !== null) && (_parentNode !== parentNode)) {
//       // if any of the parents becomes detached, the node state change
//       _unsubscribeFunctions.push(
//         onNodeDetachedListener(_node)((): void => {
//           // TODO
//         })
//       );
//       _index++;
//       _node = _parentNode;
//       _parentNode = _node.parentNode;
//     }
//
//
//     if (_parentNode === null) {
//       // await until the parent become attached
//       _unsubscribeAttachListener = onNodeAttachedListener(_node)((): void => {
//         _unsubscribeAttachListener();
//         untilNodeConnectedTo(_node, parentNode, () => {
//
//         });
//       });
//     } else {
//       emit(true);
//     }
//   }
// }

export function onNodeConnectedTo(
  node: Node,
  parentNode: Node = document,
): ISubscribeFunction<boolean> {
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    let running: boolean = true;
    let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
    let _unsubscribeAttachListener: IUnsubscribeFunction = noop;
    let _connected: boolean = parentNode.contains(node);

    const update = (referenceNode: Node): void => {
      let _node: Node = referenceNode;
      let _parentNode: Node | null = _node.parentNode;

      // for each parents, until we find parentNode or null
      while ((_parentNode !== null) && (_parentNode !== parentNode)) {
        const index: number = _unsubscribeFunctions.length;

        _unsubscribeFunctions.push(
          // if any of the parents becomes detached, the node referenceNode change
          onNodeDetachedListener(_node)((): void => {
            _unsubscribeAttachListener();
            _unsubscribeAttachListener = noop;

            // removes all unsubscribeFunctions for parents over this node
            while (_unsubscribeFunctions.length > index) {
              (_unsubscribeFunctions.pop() as IUnsubscribeFunction)();
            }

            update(referenceNode);
          })
        );
        _node = _parentNode;
        _parentNode = _node.parentNode;
      }


      if (_parentNode === null) {
        // console.log('await attached', _node);
        // await until the parent become attached
        _unsubscribeAttachListener = onNodeAttachedListener(_node)((): void => {
          _unsubscribeAttachListener();
          _unsubscribeAttachListener = noop;
          // console.log('attached', _node);
          update(_node);
        });
        if (_connected) {
          _connected = false;
          emit(false);
        }
      } else {
        if (!_connected) {
          _connected = true;
          emit(true);
        }
      }
      // console.log(_unsubscribeAttachListener === noop, _unsubscribeFunctions.length);
    };

    update(node);

    return (): void => {
      if (running) {
        running = false;
        _unsubscribeAttachListener();
        for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
          _unsubscribeFunctions[i]();
        }
      }
    };
  };
}


export function onNodeConnectedToWithImmediate(
  node: Node,
  parentNode: Node = document,
): ISubscribeFunction<boolean> {
  const listener: ISubscribeFunction<boolean> = onNodeConnectedTo(node, parentNode);
  return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
    emit(parentNode.contains(node));
    return listener(emit);
  };
}

// export function onNodeConnectedTo(
//   node: Node,
//   parentNode: Node = document,
// ): ISubscribeFunction<boolean> {
//   // const listener: ISubscribeFunction<void> = onNodeAttachedListener(node);
//   return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
//     let running: boolean = true;
//
//
//     let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
//     let _unsubscribeAttachListener: IUnsubscribeFunction | undefined;
//
//     let _node: Node = node;
//     let _parentNode: Node | null = _node.parentNode;
//     let _index: number = 0;
//
//     // for each parents, until we find parentNode or null
//     while ((_parentNode !== null) && (_parentNode !== parentNode)) {
//       // if any of the parents becomes detached, the node state change
//       _unsubscribeFunctions.push(
//         onNodeDetachedListener(_node)((): void => {
//           // TODO
//         })
//       );
//       _index++;
//       _node = _parentNode;
//       _parentNode = _node.parentNode;
//     }
//
//
//     if (_parentNode === null) {
//       // await until the parent become attached
//       _unsubscribeAttachListener = onNodeAttachedListener(_node)((): void => {
//         // change(emitDisconnect);
//       });
//     } else {
//       emit(true);
//     }
//
//     return (): void => {
//       if (!running) {
//         running = false;
//       }
//     };
//   };
// }

// export function onNodeConnectedTo(
//   node: Node,
//   parentNode: Node = document,
// ): ISubscribeFunction<boolean> {
//   // const listener: ISubscribeFunction<void> = onNodeAttachedListener(node);
//   return (emit: IEmitFunction<boolean>): IUnsubscribeFunction => {
//     let running: boolean = true;
//     let clear: () => void;
//
//     const change = (emitDisconnect: boolean) => {
//       if (parentNode.contains(node)) {
//         emit(true);
//
//         let _unsubscribeFunctions: IUnsubscribeFunction[] = [];
//
//         clear = () => {
//           for (let i = 0, l = _unsubscribeFunctions.length; i < l; i++) {
//             _unsubscribeFunctions[i]();
//           }
//         };
//
//         // if any of its parents is detached, the node is disconnected
//         let _node: Node | null = node;
//         while (_node !== null) {
//           _unsubscribeFunctions.push(
//             onNodeDetachedListener(_node)((): void => {
//               clear();
//               if (running) {
//                 change(true);
//               }
//             })
//           );
//           _node = _node.parentNode;
//         }
//       } else {
//         if (emitDisconnect) {
//           emit(false);
//         }
//
//         let _node: Node = node;
//         while (_node.parentNode !== null) {
//           _node = _node.parentNode;
//         }
//
//         clear = onNodeAttachedListener(_node)((): void => {
//           change(emitDisconnect);
//         });
//       }
//     }
//
//     change(true);
//
//     return (): void => {
//       if (!running) {
//         running = false;
//         clear();
//       }
//     };
//   };
// }


// /** DESTROY **/
//
// const ON_NODE_DESTROYED_LISTENERS = new WeakMap<Node, IEmitFunction<void>[]>();
// const DESTROYED_NODES = new WeakSet<Node>();
//
// export const {
//   listener: nodeDestroyedListener,
//   dispatch: dispatchNodeDestroyed,
// } = createListenerBuilderFunctions(ON_NODE_DESTROYED_LISTENERS);
//
//
// /**
//  * Flags a Node as destroyed and dispatch corresponding event.
//  */
// export function destroyNode(
//   node: Node,
// ): void {
//   if (DESTROYED_NODES.has(node)) {
//     throw new Error(`Already destroyed`);
//   } else {
//     DESTROYED_NODES.add(node);
//     dispatchNodeDestroyed(node);
//   }
// }
//
// export function destroyNodeAndChildren(
//   node: Node,
// ): void {
//   destroyNode(node);
//   let child: Node | null = node.firstChild;
//   while (child !== null) {
//     destroyNodeAndChildren(child);
//     child = child.nextSibling;
//   }
// }


