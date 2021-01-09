import { IDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';
import { DEFAULT_ON_NULL_DOUBLY_LINKED_LIST_NODE } from './get-required-doubly-linked-list-node-value';


/**
 * Sets the value of 'node' or throws if 'node' is null
 */
export function setRequiredDoublyLinkedListNodeValue<GValue>(
  node: IDoublyLinkedListNode<GValue> | null,
  value: GValue,
  onNull: () => never = DEFAULT_ON_NULL_DOUBLY_LINKED_LIST_NODE,
): void {
  if (node === null) {
    onNull();
  } else {
    node.value = value;
  }
}
