import { IDoublyLinkedList } from '../../doubly-linked-list-interface';
import { IAttachedDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';
import { getRequiredDoublyLinkedListNodeValue } from '../misc/get-required-doubly-linked-list-node-value';
import { getOptionalDoublyLinkedListNodeValue } from '../misc/get-optional-doubly-linked-list-node-value';
import { setRequiredDoublyLinkedListNodeValue } from '../misc/set-required-doubly-linked-list-node-value';

export const THROW_INDEX_OUT_OF_RANGE = (): never => {
  throw new RangeError(`Index out of range`);
};


/* FROM START */

/**
 * Returns the node at 'index' from the start of 'list'
 */
export function getNodeAtIndexFromStartOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): IAttachedDoublyLinkedListNode<GValue> | null {
  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
  let _index: number = 0;
  while ((node !== null) && (_index < index)) {
    _index++;
    node = node.next;
  }
  return node;
}

/**
 * Returns the value at 'index' from the start of 'list'
 * INFO: if index is out of range, throws a RangeError
 */
export function getRequiredValueAtIndexFromStartOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): GValue {
  return getRequiredDoublyLinkedListNodeValue<GValue>(
    getNodeAtIndexFromStartOfDoublyLinkedList<GValue>(list, index),
    THROW_INDEX_OUT_OF_RANGE
  );
}

/**
 * Returns the value at 'index' from the start of 'list'.
 * INFO: if index is out of range, returns undefined
 */
export function getOptionalValueAtIndexFromStartOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): GValue | undefined {
  return getOptionalDoublyLinkedListNodeValue<GValue>(getNodeAtIndexFromStartOfDoublyLinkedList<GValue>(list, index));
}

/**
 * Sets the value at 'index' from the start of 'list'
 * INFO: if index is out of range, throws a RangeError
 */
export function setValueAtIndexFromStartOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
  value: GValue,
): void {
  return setRequiredDoublyLinkedListNodeValue<GValue>(
    getNodeAtIndexFromStartOfDoublyLinkedList<GValue>(list, index),
    value,
    THROW_INDEX_OUT_OF_RANGE
  );
}


/* FROM END */

/**
 * Returns the node at 'index' from the end of 'list'
 */
export function getNodeAtIndexFromEndOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): IAttachedDoublyLinkedListNode<GValue> | null {
  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.last;
  let _index: number = 0;
  while ((node !== null) && (_index < index)) {
    _index++;
    node = node.previous;
  }
  return node;
}

/**
 * Returns the value at 'index' from the end of 'list'
 * INFO: if index is out of range, throws a RangeError
 */
export function getRequiredValueAtIndexFromEndOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): GValue {
  return getRequiredDoublyLinkedListNodeValue<GValue>(
    getNodeAtIndexFromEndOfDoublyLinkedList<GValue>(list, index),
    () => {
      throw new RangeError(`Index out of range`);
    }
  );
}

/**
 * Returns the value at 'index' from the end of 'list'.
 * INFO: if index is out of range, returns undefined
 */
export function getOptionalValueAtIndexFromEndOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
): GValue | undefined {
  return getOptionalDoublyLinkedListNodeValue<GValue>(getNodeAtIndexFromEndOfDoublyLinkedList<GValue>(list, index));
}

/**
 * Sets the value at 'index' from the end of 'list'
 * INFO: if index is out of range, throws a RangeError
 */
export function setValueAtIndexFromEndOfDoublyLinkedList<GValue>(
  list: IDoublyLinkedList<GValue>,
  index: number,
  value: GValue,
): void {
  return setRequiredDoublyLinkedListNodeValue<GValue>(
    getNodeAtIndexFromEndOfDoublyLinkedList<GValue>(list, index),
    value,
    THROW_INDEX_OUT_OF_RANGE
  );
}
