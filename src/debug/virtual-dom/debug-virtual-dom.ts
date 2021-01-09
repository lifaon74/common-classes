import { IDoublyLinkedList } from '../linked-list/doubly/doubly-linked-list-interface';
import {
  IAttachedDoublyLinkedListNode, IDetachedDoublyLinkedListNode, IGenericDoublyLinkedListNode
} from '../linked-list/doubly/doubly-linked-list-node-interface';
import { IEmitFunction, ISubscribeFunction } from '../observables-v5/types';
import { createListenerBuilderFunctions } from '../observables-v5/misc/event-listener/build-event-listener';
import { detachAttachedDoublyLinkedListNode } from '../linked-list/doubly/functions/modify/remove/detach';
import { appendDetachedNodeForDoublyLinkedList } from '../linked-list/doubly/functions/modify/insert/append';
import { insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList } from '../linked-list/doubly/functions/modify/insert/insert-before';
import { pipeSubscribeFunction } from '../observables-v5/misc/helpers/pipe-subscribe-function';
import { interval } from '../observables-v5/from/time-related/interval';
import { mapOperator } from '../observables-v5/operators/map';
import { shareOperator } from '../observables-v5/operators/share';

// const a: HTMLElement;
// a.remove();
// a.append();


/*
SYNTAX:

<div *let="data = data.observable">
  ...content
</div>

=>

let previousNode = createComment('*let="data = data.observable"');
subscribe(data.observable, (data) => {
  const node = createElement('div');
  replaceNode(previousNode, node);
  // ... insert content
));

 */

/*----------------------------------------------------------------------------------------------------*/

// /** ATTACH **/

const ON_TREE_NODE_ATTACHED_LISTENERS = new WeakMap<ITreeNode, IEmitFunction<void>[]>();

export const {
  listener: treeNodeAttachedListener,
  dispatch: dispatchTreeNodeAttached,
} = createListenerBuilderFunctions(ON_TREE_NODE_ATTACHED_LISTENERS);


const ON_TREE_NODE_DETACHED_LISTENERS = new WeakMap<ITreeNode, IEmitFunction<void>[]>();

export const {
  listener: treeNodeDetachedListener,
  dispatch: dispatchTreeNodeDetached,
} = createListenerBuilderFunctions(ON_TREE_NODE_DETACHED_LISTENERS);


// // derived
//
// export function appendVirtualNode(
//   child: VirtualNode,
//   parent: VirtualParentNode,
// ): void {
//   attachVirtualNode(child, parent, parent.children.length);
// }
//
// export function prependVirtualNode(
//   child: VirtualNode,
//   parent: VirtualParentNode,
// ): void {
//   attachVirtualNode(child, parent, 0);
// }
//
// export function insertVirtualNodeBefore(
//   child: VirtualNode,
//   parent: VirtualParentNode,
//   referenceNode: VirtualNode,
// ): void {
//   attachVirtualNode(child, parent, getVirtualNodeIndexOrThrow(referenceNode, parent));
// }
//
// export function insertVirtualNodeAfter(
//   child: VirtualNode,
//   parent: VirtualParentNode,
//   referenceNode: VirtualNode,
// ): void {
//   attachVirtualNode(child, parent, getVirtualNodeIndexOrThrow(referenceNode, parent) + 1);
// }
//
//
// /** DETACH **/
//
// export interface IVirtualNodeDetachEvent {
//   readonly parent: VirtualParentNode;
// }
//
// export function createVirtualNodeDetachEvent(
//   parent: VirtualParentNode,
// ): IVirtualNodeDetachEvent {
//   return Object.freeze({
//     parent,
//   });
// }
//
//
// const ON_VIRTUAL_NODE_DETACHED_LISTENERS = new WeakMap<VirtualNode, IEmitFunction<IVirtualNodeDetachEvent>[]>();
//
// export const {
//   listener: nodeVirtualDetachedListener,
//   dispatch: dispatchVirtualNodeDetached,
// } = createListenerBuilderFunctions(ON_VIRTUAL_NODE_DETACHED_LISTENERS);
//
//
// export function detachVirtualNode(
//   child: VirtualNode,
// ): void {
//   const parent: VirtualParentNode | undefined = VIRTUAL_NODE_PARENT_CHILD_MAP.get(child);
//   if (parent === void 0) {
//     throw new Error(`child is not linked with a parent`);
//   } else {
//     VIRTUAL_NODE_PARENT_CHILD_MAP.delete(child);
//     parent.children.splice(getVirtualNodeIndexOrThrow(child, parent), 1);
//     dispatchVirtualNodeDetached(child, createVirtualNodeDetachEvent(parent));
//   }
// }

/*---*/

export interface IDoublyLinkedListNodeForTreeNode extends IGenericDoublyLinkedListNode<ITreeNode> {
  list: IDoublyLinkedListForParentTreeNode | null;
}

export function createDetachedDoublyLinkedListNodeForTreeNode(
  node: ITreeNode,
): IDoublyLinkedListNodeForTreeNode {
  return {
    previous: null,
    next: null,
    list: null,
    value: node,
  };
}


export interface IDoublyLinkedListForParentTreeNode extends IDoublyLinkedList<ITreeNode> {
  owner: IParentTreeNode;
}

export function createDoublyLinkedListForParentTreeNode(
  node: IParentTreeNode,
): IDoublyLinkedListForParentTreeNode {
  return {
    first: null,
    last: null,
    owner: node,
  };
}


/*---*/


export interface ITreeNode {
  getPreviousNode(): ITreeNode | null;

  getNextNode(): ITreeNode | null;

  getParentNode(): IParentTreeNode | null;

  remove(): void;
}

export class TreeNode implements ITreeNode {
  protected _node: IDoublyLinkedListNodeForTreeNode;

  constructor() {
    this._node = createDetachedDoublyLinkedListNodeForTreeNode(this);
  }

  getPreviousNode(): ITreeNode | null {
    return (this._node.previous === null)
      ? null
      : this._node.previous.value;
  }

  getNextNode(): ITreeNode | null {
    return (this._node.next === null)
      ? null
      : this._node.next.value;
  }

  getParentNode(): IParentTreeNode | null {
    return (this._node.list === null)
      ? null
      : this._node.list.owner;
  }

  remove(): void {
    if (this._node.list !== null) {
      detachAttachedDoublyLinkedListNode<ITreeNode>(this._node as IAttachedDoublyLinkedListNode<ITreeNode>);
      dispatchTreeNodeDetached(this);
    }
  }
}

export function treeNodeHasParent(
  node: ITreeNode | null,
  parentNode: ITreeNode,
): boolean {
  while (node !== null) {
    if (node === parentNode) {
      return true;
    }
    node = node.getParentNode();
  }
  return false;
}


/*---*/

export interface IParentTreeNode extends ITreeNode {
  getFirstChild(): ITreeNode | null;

  getLastChild(): ITreeNode | null;
}

export class ParentTreeNode extends TreeNode implements IParentTreeNode {
  protected _children: IDoublyLinkedListForParentTreeNode;

  constructor() {
    super();
    this._children = createDoublyLinkedListForParentTreeNode(this);
  }

  getFirstChild(): ITreeNode | null {
    return (this._children.first === null)
      ? null
      : this._children.first.value;
  }

  getLastChild(): ITreeNode | null {
    return (this._children.last === null)
      ? null
      : this._children.last.value;
  }

  insertBefore<GNode extends ITreeNode>(
    node: GNode,
    referenceNode: ITreeNode | null,
  ): GNode {
    if (treeNodeHasParent(this, node)) {
      throw new Error(`Inserted node is a parent of this node`);
    } else {
      node.remove();
      if (referenceNode === null) {
        appendDetachedNodeForDoublyLinkedList<ITreeNode>(
          this._children,
          (node as any)._node as IDetachedDoublyLinkedListNode<ITreeNode>,
        );
      } else {
        insertDetachedNodeBeforeReferenceNodeForDoublyLinkedList<ITreeNode>(
          this._children,
          (node as any)._node as IDetachedDoublyLinkedListNode<ITreeNode>,
          (referenceNode as any)._node as IAttachedDoublyLinkedListNode<ITreeNode>,
        );
      }
      dispatchTreeNodeAttached(node);
      return node;
    }
  }
}


/*---*/

export interface IVirtualDOMNode<GNode extends Node> {
  getDOMNode(): GNode;
}

export function isVirtualDOMNode<GNode extends Node>(value: any): value is IVirtualDOMNode<GNode> {
  return (typeof value.getDOMNode === 'function');

}

// export function findNextVirtualDOMNode<GNode extends Node>(
//   origin: ITreeNode | null,
// ): IVirtualDOMNode<GNode> | null {
//   while (origin !== null) {
//     if (isVirtualDOMNode(origin)) {
//       return origin;
//     }
//   }
//   return null;
// }


// export function findVirtualDOMNodeInsertPoint(
//   origin: ITreeNode,
// ): [parentNode: ParentNode | null, referenceNode: Node | null] {
//   let node: ITreeNode | null = origin.getNextNode();
//
//   while (node !== null) {
//     if (isVirtualDOMNode(node)) {
//       const domNode: Node = node.getDOMNode();
//       return [domNode.parentNode, domNode];
//     }
//   }
//
//   const parent: IParentTreeNode | null = origin.getParentNode();
//   if (parent !== null) {
//
//   }
//
//
//   throw new Error(`Unable to find insert point in the DOM`);
// }

/*---*/

export interface IVirtualDOMElement<GElement extends Element> extends IParentTreeNode, IVirtualDOMNode<GElement> {

}

export class VirtualDOMElement<GElement extends Element> extends ParentTreeNode implements IVirtualDOMElement<GElement> {
  protected _element: GElement;

  constructor(_element: GElement) {
    super();
    this._element = _element;
  }

  getDOMNode(): GElement {
    return this._element;
  }
}

/*---*/

export interface IReactiveTextNode extends ITreeNode, IVirtualDOMNode<Text> {
  getValue(): string;
}

export class ReactiveTextNode extends TreeNode implements IReactiveTextNode {
  protected _domNode: Text;

  constructor(subscribe: ISubscribeFunction<string>) {
    super();
    this._domNode = new Text('abc');

    treeNodeAttachedListener(this)(() => {
      console.log('attached to the dom', this.getParentNode());
      // TODO append to the DOM
      // TODO search next VirtualNode in the tree having a 'node'
      // const [parentNode, referenceNode] = findVirtualDOMNodeInsertPoint(this);
    });

    treeNodeDetachedListener(this)(() => {
      this._domNode.remove();
    });
  }

  getDOMNode(): Text {
    return this._domNode;
  }

  getValue(): string {
    return this._domNode.data;
  }
}


// export interface IVirtualTextNode extends ITreeNode {
//   getValue(): string;
//   setValue(value: string): void;
// }
//
// export interface IVirtualDOMTextNode extends IVirtualTextNode, IVirtualDOMNode<Text> {
//
// }
//
// export class VirtualDOMTextNode extends TreeNode implements IVirtualDOMTextNode {
//   protected _domNode: Text;
//
//   constructor() {
//     super('text node');
//     this._domNode = new Text();
//   }
//
//   getNode(): Text {
//     return this._domNode;
//   }
//
//   getValue(): string {
//     return this._domNode.data;
//   }
//
//   setValue(value: string): void {
//     this._domNode.data = value;
//   }
// }

/*---*/


//
//
// export class VirtualDOMTextNode extends VirtualTextNode {
//   public readonly node: Text;
//   protected _unsubscribeNodeVirtualAttachedListener: IUnsubscribeFunction;
//   protected _unsubscribeNodeVirtualDetachedListener: IUnsubscribeFunction;
//
//   constructor() {
//     super();
//     this.node = new Text();
//
//     this._unsubscribeNodeVirtualAttachedListener = nodeVirtualAttachedListener(this)(() => {
//       // TODO append to the DOM
//       // TODO search next VirtualNode in the tree having a 'node'
//     });
//
//     this._unsubscribeNodeVirtualDetachedListener = nodeVirtualDetachedListener(this)(() => {
//       this.node.remove();
//     });
//   }
//
//   setValue(value: string): void {
//     super.setValue(value);
//     this.node.data = value;
//   }
// }
//


// export class VirtualElementNode extends VirtualNode {
//   protected _value: string;
//
//   constructor() {
//     super('text node');
//     this._value = '';
//   }
//
//   getValue(): string {
//     return this._value;
//   }
//
//   setValue(value: string): void {
//     this._value = value;
//   }
// }


/*---------------*/

// export async function debugVirtualDOM1() {
//
//   const parent = new ParentTreeNode('parent');
//   const child1 = new TreeNode('child1');
//   const child2 = new TreeNode('child2');
//   const child3 = new TreeNode('child3');
//   const child4 = new TreeNode('child4');
//
//   parent.insertBefore(child1, null);
//   parent.insertBefore(child2, null);
//   parent.insertBefore(child3, null);
//   parent.insertBefore(child4, null);
//
//   child3.remove();
//
//   console.log(parent);
//   debugger;
// }

export async function debugVirtualDOM2() {
  const body = new VirtualDOMElement(document.body);

  const source = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, string>(() => new Date().toString()),
    shareOperator<string>(),
  ]);

  const text = new ReactiveTextNode(source);
  body.insertBefore(text, null);
}


/*---------------*/


export async function debugVirtualDOM() {
  await debugVirtualDOM2();
}

