import { uuid } from '../../misc/helpers/uuid';
import { attachNode, onNodeAttachedListener } from '../dom-mutation/attach-node';
import { detachNode, onNodeDetachedListener } from '../dom-mutation/detach-node';

// export function createContainerNode(
//   nodes: Node[] = [],
// ): Comment {
//   const _uuid: string = uuid();
//   return Object.freeze({
//     startNode: new Comment(`CONTAINER - START - ${ _uuid }`),
//     endNode: new Comment(`CONTAINER - END - ${ _uuid }`),
//     nodes,
//   });
// }

export class ContainerNode extends Comment {

  protected _startNode: Text | Comment;
  protected _endNode: Text | Comment;
  protected _fragment: DocumentFragment;
  protected _children: Node[];

  constructor(
    name: string = `CONTAINER - ${ uuid() }`,
    transparent: boolean = false,
  ) {
    super(name);
    this._startNode = transparent ? new Text() : new Comment(`START - ${ name }`);
    this._endNode = transparent ? new Text() : new Comment(`END - ${ name }`);
    this._fragment = new DocumentFragment();
    this._children = [];

    onNodeAttachedListener(this)(() => {
      attachNode(this._startNode, this._fragment, this._fragment.firstChild);
      attachNode(this._endNode, this._fragment, null);
      attachNode(this._fragment, this.parentNode as Node, this.nextSibling); // fragment becomes empty
    });

    onNodeDetachedListener(this)(() => {
      let node: Node | null = this._startNode.nextSibling;
      while ((node !== null) && (node !== this._endNode)) {
        detachNode(node);
        attachNode(node, this._fragment, null);
        node = this._startNode.nextSibling;
      }
      detachNode(this._startNode);
      detachNode(this._endNode);
    });
  }

  getChildren(): Node[] {
    const children: Node[] = [];
    if (this.parentNode === null) {
      let node: Node = this._startNode.nextSibling as Node;
      while (node !== this._endNode) {
        children.push(node);
        node = node.nextSibling as Node;
      }
    } else {
      let node: Node | null = this._fragment.firstChild;
      while (node !== null) {
        children.push(node);
        node = node.nextSibling;
      }
    }
    return children;
  }

  insertBefore<T extends Node>(
    newChild: T,
    refChild: Node | null,
  ): T {
    if (this.parentNode === null) {
      return this._fragment.insertBefore<T>(newChild, refChild);
    } else {
      return this.parentNode.insertBefore<T>(
        newChild,
        (refChild === null)
          ? this._endNode
          : refChild
      );
    }
  }

}



// export interface IContainerNode {
//   readonly startNode: Comment;
//   readonly endNode: Comment;
//   readonly nodes: Node[];
// }
//
//
// export function createContainerNode(
//   nodes: Node[] = [],
// ): IContainerNode {
//   const _uuid: string = uuid();
//   return Object.freeze({
//     startNode: new Comment(`CONTAINER - START - ${ _uuid }`),
//     endNode: new Comment(`CONTAINER - END - ${ _uuid }`),
//     nodes,
//   });
// }
//
//
// // export function destroyContainerNode(
// //   node: IContainerNode,
// // ): void {
// //   destroyNode(node.startNode);
// //   for (let i = 0, l = node.nodes.length; i < l; i++) {
// //     destroyNode(node.nodes[i]);
// //   }
// //   destroyNode(node.endNode);
// // }
//
//
// export function attachContainerNode(
//   node: IContainerNode,
//   parentNode: Node,
//   referenceNope: Node | null,
// ): void {
//   const fragment: DocumentFragment = document.createDocumentFragment();
//   fragment.appendChild(node.startNode);
//   for (let i = 0, l = node.nodes.length; i < l; i++) {
//     fragment.appendChild(node.nodes[i]);
//   }
//   fragment.appendChild(node.endNode);
//   attachNode(fragment, parentNode, referenceNope);
// }
//
//
// export function detachContainerNode(
//   node: IContainerNode,
// ): void {
//   detachNode(node.startNode);
//   for (let i = 0, l = node.nodes.length; i < l; i++) {
//     detachNode(node.nodes[i]);
//   }
//   detachNode(node.endNode);
// }


