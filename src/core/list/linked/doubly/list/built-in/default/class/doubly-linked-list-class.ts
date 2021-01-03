// import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
// import { ImplTraitGetNextForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-get-next-implementation';
// import {
//   DOUBLY_LINKED_LIST_PRIVATE_CONTEXT, IDoublyLinkedListPrivateContext, IDoublyLinkedListStruct
// } from '../struct/doubly-linked-list-struct';
// import { ImplTraitSetNextForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-set-next-implementation';
// import { ImplTraitSetPreviousForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-set-previous-implementation';
// import { ImplTraitGetPreviousForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-get-previous-implementation';
// import { ImplTraitSetValueForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-set-value-implementation';
// import { ImplTraitGetValueForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-get-value-implementation';
// import { ImplTraitNextIteratorForDoublyLinkedListStruct } from '../struct/implementations/doubly-linked-list--struct-next-iterator-implementation';
//
// /** CONSTRUCTOR **/
//
// export function ConstructDoublyLinkedList<GValue>(
//   instance: IDoublyLinkedList<GValue>,
//   value: GValue,
// ): void {
//   CreatePrivateContext<IDoublyLinkedListPrivateContext<IDoublyLinkedList<GValue>, GValue>>(
//     DOUBLY_LINKED_LIST_PRIVATE_CONTEXT,
//     instance,
//     {
//       previous: instance,
//       next: instance,
//       value: value,
//     },
//   );
// }
//
//
// /** CLASS **/
//
// // FOR PROTOTYPE
//
// export interface IDoublyLinkedListImplementations<GValue> extends
//   // implementations
//
//   // previous
//   ImplTraitGetPreviousForDoublyLinkedListStruct<IDoublyLinkedList<GValue>>,
//   ImplTraitSetPreviousForDoublyLinkedListStruct<IDoublyLinkedList<GValue>>,
//   // next
//   ImplTraitGetNextForDoublyLinkedListStruct<IDoublyLinkedList<GValue>>,
//   ImplTraitSetNextForDoublyLinkedListStruct<IDoublyLinkedList<GValue>>,
//   // value
//   ImplTraitGetValueForDoublyLinkedListStruct<IDoublyLinkedList<GValue>, GValue>,
//   ImplTraitSetValueForDoublyLinkedListStruct<IDoublyLinkedList<GValue>, GValue>,
//   // iterators
//   ImplTraitNextIteratorForDoublyLinkedListStruct<IDoublyLinkedList<GValue>>
//   //
// {
// }
//
// export const DoublyLinkedListImplementations = [
//   // previous
//   ImplTraitGetPreviousForDoublyLinkedListStruct,
//   ImplTraitSetPreviousForDoublyLinkedListStruct,
//   // next
//   ImplTraitGetNextForDoublyLinkedListStruct,
//   ImplTraitSetNextForDoublyLinkedListStruct,
//   // value
//   ImplTraitGetValueForDoublyLinkedListStruct,
//   ImplTraitSetValueForDoublyLinkedListStruct,
//   // iterators
//   ImplTraitNextIteratorForDoublyLinkedListStruct,
// ];
//
// export interface IDoublyLinkedListImplementationsConstructor {
//   new<GValue>(): IDoublyLinkedList<GValue>;
// }
//
// export interface IDoublyLinkedList<GValue> extends IDoublyLinkedListStruct<IDoublyLinkedList<GValue>, GValue>, IDoublyLinkedListImplementations<GValue> {
// }
//
//
// const DoublyLinkedListImplementationsConstructor = AssembleTraitImplementations<IDoublyLinkedListImplementationsConstructor>(DoublyLinkedListImplementations);
//
// export class DoublyLinkedList<GValue> extends DoublyLinkedListImplementationsConstructor<GValue> implements IDoublyLinkedList<GValue> {
//   readonly [DOUBLY_LINKED_LIST_PRIVATE_CONTEXT]: IDoublyLinkedListPrivateContext<IDoublyLinkedList<GValue>, GValue>;
//
//   constructor(
//     value: GValue,
//   ) {
//     super();
//     ConstructDoublyLinkedList<GValue>(this, value);
//   }
//
// }
