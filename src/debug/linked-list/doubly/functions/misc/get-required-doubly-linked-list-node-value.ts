import { IDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';

export const DEFAULT_ON_NULL_DOUBLY_LINKED_LIST_NODE = (): never => {
  throw new Error(`Node not found`);
};

/**
 * Returns the value of 'node' or throws if 'node' is null
 */
export function getRequiredDoublyLinkedListNodeValue<GValue>(
  node: IDoublyLinkedListNode<GValue> | null,
  onNull: () => never = DEFAULT_ON_NULL_DOUBLY_LINKED_LIST_NODE,
): GValue {
  if (node === null) {
    onNull();
  } else {
    return node.value;
  }
}

