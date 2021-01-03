import { IDoublyLinkedListNodeLike } from '../doubly-linked-list-node-interface';


export function detachSingle(
  node: IDoublyLinkedListNodeLike<IDoublyLinkedListNodeLike<any>>
): void {
  node.getPrevious().setNext(node.getNext());
  node.getNext().setPrevious(node.getPrevious());
  node.setPrevious(node);
  node.setNext(node);
}


// export function detach(
//   node: IDoublyLinkedListNodeLike
// ): void {
//   // detach(this: GSelf): void {
//     this.getPrevious().setNext(this.getNext());
//     this.getNext().setPrevious(this.getPrevious());
//     this.setPrevious(this);
//     this.setNext(this);
//   // }
// }


