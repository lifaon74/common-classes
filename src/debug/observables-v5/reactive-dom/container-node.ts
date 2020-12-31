import { uuid } from '../misc/helpers/uuid';
import { attachNode, destroyNode, detachNode } from './node-state/dom-state-observer';

export interface IContainerNode {
  readonly startNode: Comment;
  readonly endNode: Comment;
  readonly nodes: Node[];
}


export function createContainerNode(
  nodes: Node[] = [],
): IContainerNode {
  const _uuid: string = uuid();
  return Object.freeze({
    startNode: new Comment(`CONTAINER - START - ${ _uuid }`),
    endNode: new Comment(`CONTAINER - END - ${ _uuid }`),
    nodes,
  });
}


export function destroyContainerNode(
  node: IContainerNode,
): void {
  destroyNode(node.startNode);
  for (let i = 0, l = node.nodes.length; i < l; i++) {
    destroyNode(node.nodes[i]);
  }
  destroyNode(node.endNode);
}


export function attachContainerNode(
  node: IContainerNode,
  parentNode: Node,
  referenceNope: Node | null,
): void {
  const fragment: DocumentFragment = document.createDocumentFragment();
  fragment.appendChild(node.startNode);
  for (let i = 0, l = node.nodes.length; i < l; i++) {
    fragment.appendChild(node.nodes[i]);
  }
  fragment.appendChild(node.endNode);
  attachNode(fragment, parentNode, referenceNope);
}


export function detachContainerNode(
  node: IContainerNode,
): void {
  detachNode(node.startNode);
  for (let i = 0, l = node.nodes.length; i < l; i++) {
    detachNode(node.nodes[i]);
  }
  detachNode(node.endNode);
}


