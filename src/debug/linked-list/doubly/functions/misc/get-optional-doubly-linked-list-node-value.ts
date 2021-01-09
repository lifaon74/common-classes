import { IDoublyLinkedListNode } from '../../doubly-linked-list-node-interface';


/**
 * Returns the value of 'node' or undefined if 'node' is null
 */
export function getOptionalDoublyLinkedListNodeValue<GValue>(
  node: IDoublyLinkedListNode<GValue> | null,
): GValue | undefined;
export function getOptionalDoublyLinkedListNodeValue<GValue, GDefaultValue>(
  node: IDoublyLinkedListNode<GValue> | null,
  defaultValue: GDefaultValue,
): GValue | GDefaultValue;
export function getOptionalDoublyLinkedListNodeValue<GValue, GDefaultValue>(
  node: IDoublyLinkedListNode<GValue> | null,
  defaultValue?: GDefaultValue
): GValue | undefined | GDefaultValue {
  return (node === null)
    ? defaultValue
    : node.value;
}
