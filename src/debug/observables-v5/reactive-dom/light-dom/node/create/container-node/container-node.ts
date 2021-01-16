import { uuid } from '../../../../../misc/helpers/uuid';
import { attachStandardNode, onNodeAttachedListener } from '../../move/standard/attach-standard-node';
import { detachStandardNode, onNodeDetachedListener } from '../../move/standard/detach-standard-node';
import { attachDocumentFragment } from '../../move/fragment/attach-document-fragment';
import { IStandardNode } from '../../type/is-standard-node';
import { moveStandardNode } from '../../move/standard/move-standard-node';
import { nodeInsertBefore } from '../../move/devired/dom-like/node/node-insert-before';

type IContainerNodeBoundary = Text | Comment;

export class ContainerNode extends Comment {

  protected _startNode: IContainerNodeBoundary;
  protected _endNode: IContainerNodeBoundary;
  protected _fragment: DocumentFragment;

  constructor(
    name: string = `CONTAINER - ${ uuid() }`,
    transparent: boolean = false,
  ) {
    super(name);
    const startNode: IContainerNodeBoundary = transparent ? new Text() : new Comment(`START - ${ name }`);
    const endNode: IContainerNodeBoundary = transparent ? new Text() : new Comment(`END - ${ name }`);
    const fragment: DocumentFragment = new DocumentFragment();

    this._startNode = startNode;
    this._endNode = endNode;
    this._fragment = fragment;

    onNodeAttachedListener(this)((move: boolean) => {
      const parentNode: Node = this.parentNode as Node;
      if (move) {
        let node: IStandardNode = endNode.previousSibling as IStandardNode;
        moveStandardNode(endNode, parentNode, this.nextSibling);
        while (node !== startNode) {
          const previousSibling: IStandardNode = node.previousSibling as IStandardNode;
          moveStandardNode(node, parentNode, this.nextSibling);
          node = previousSibling;
        }
        moveStandardNode(startNode, parentNode, this.nextSibling);
      } else {
        attachStandardNode(endNode, parentNode, this.nextSibling);
        attachStandardNode(startNode, parentNode, endNode);
        attachDocumentFragment(fragment, parentNode, endNode); // fragment becomes empty
      }
    });

    onNodeDetachedListener(this)((move: boolean) => {
      if (!move) {
        let node: IStandardNode = startNode.nextSibling as IStandardNode;
        while (node !== endNode) {
          const nextSibling: IStandardNode = node.nextSibling as IStandardNode;
          moveStandardNode(node, fragment, null);
          node = nextSibling;
        }
        detachStandardNode(startNode);
        detachStandardNode(endNode);
      }
    });
  }

  get firstChild(): ChildNode | null {
    if (this.parentNode === null) {
      return this._fragment.firstChild;
    } else {
      const node: ChildNode | null = this._startNode.nextSibling;
      return (node === this._endNode)
        ? null
        : node;
    }
  }

  get lastChild(): ChildNode | null {
    if (this.parentNode === null) {
      return this._fragment.lastChild;
    } else {
      const node: ChildNode | null = this._endNode.previousSibling;
      return (node === this._startNode)
        ? null
        : node;
    }
  }

  getChildren(): Node[] {
    const children: Node[] = [];
    if (this.parentNode === null) {
      let node: Node | null = this._fragment.firstChild;
      while (node !== null) {
        children.push(node);
        node = node.nextSibling;
      }
    } else {
      let node: Node = this._startNode.nextSibling as Node;
      while (node !== this._endNode) {
        children.push(node);
        node = node.nextSibling as Node;
      }
    }
    return children;
  }

  insertBefore<GNewChild extends Node>(
    newChild: GNewChild,
    refChild: Node | null,
  ): GNewChild {
    if (this.parentNode === null) {
      return nodeInsertBefore<GNewChild>(this._fragment, newChild, refChild);
      // return this._fragment.insertBefore<T>(newChild, refChild);
    } else {
      return nodeInsertBefore<GNewChild>(
        this.parentNode,
        newChild,
        (refChild === null)
          ? this._endNode
          : refChild
      );
      // return this.parentNode.insertBefore<GNewChild>(
      //   newChild,
      //   (refChild === null)
      //     ? this._endNode
      //     : refChild
      // );
    }
  }
}

// TODO
// export function createContainerNode() {
//
// }

