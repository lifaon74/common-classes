import { IDoublyLinkedList } from './doubly-linked-list-interface';
import { createDoublyLinkedListFirstToLastValueIterator } from './functions/explore/iterators';
import { arrayEquals } from '../../test/compare';
import { IAttachedDoublyLinkedListNode } from './doubly-linked-list-node-interface';
import { createDoublyLinkedListFromValues } from './functions/create/create-doubly-linked-list-from-values';
import { createDoublyLinkedList } from './functions/create/create-doubly-linked-list';
import { assert, assertFails } from '../../test/assert';
import { appendValueForDoublyLinkedList } from './functions/modify/insert/append';
import { prependValueForDoublyLinkedList } from './functions/modify/insert/prepend';
import { insertValueBeforeForDoublyLinkedList } from './functions/modify/insert/insert-before';
import { insertValueAfterForDoublyLinkedList } from './functions/modify/insert/insert-after';
import { attachValueAfterForDoublyLinkedList } from './functions/modify/insert/attach-after';
import { detachAttachedDoublyLinkedListNode } from './functions/modify/remove/detach';
import { removeFirstValueOfDoublyLinkedList } from './functions/modify/remove/detach-first';
import { removeLastValueOfDoublyLinkedList } from './functions/modify/remove/detach-last';
import { getDoublyLinkedListSize } from './functions/explore/size';
import {
  getRequiredValueAtIndexFromStartOfDoublyLinkedList, setValueAtIndexFromStartOfDoublyLinkedList
} from './functions/explore/at-index';
import { runTest, runTests } from '../../test/test-functions';
import { attachValueBeforeForDoublyLinkedList } from './functions/modify/insert/attach-before';


export function checkDoublyLinkedListValues<GValue>(
  list: IDoublyLinkedList<GValue>,
  values: ArrayLike<GValue>,
): void {
  checkDoublyLinkedListConsistency<GValue>(list);

  const firstToLastValues: GValue[] = Array.from(createDoublyLinkedListFirstToLastValueIterator<GValue>(list));

  if (!arrayEquals(firstToLastValues, values)) {
    console.log('expected', values);
    console.log('found', firstToLastValues);
    throw new Error(`doubly linked list values differ`);
  }
}

export function checkDoublyLinkedListConsistency<GValue>(
  list: IDoublyLinkedList<GValue>,
): void {
  let previous: IAttachedDoublyLinkedListNode<GValue> | null = null;

  let node: IAttachedDoublyLinkedListNode<GValue> | null = list.first;
  while (node !== null) {
    if (node.list !== list) {
      throw new Error(`doubly linked list - node.list !== list`);
    }

    if (node.previous !== previous) {
      throw new Error(`doubly linked list - node.previous !== previous`);
    }

    if (previous !== null) {
      if (previous.next !== node) {
        throw new Error(`doubly linked list - previous.next !== node`);
      }
    }

    previous = node;
    node = node.next;
  }

  if (list.last !== previous) {
    throw new Error(`doubly linked list - list.last !== previous`);
  }
}

/*------*/

export async function testDoublyLinkedListFromValues() {
  const values = ['a', 'b'];
  checkDoublyLinkedListValues(createDoublyLinkedListFromValues<string>(values), values);
}

export async function testDoublyLinkedListAppend() {
  const list = createDoublyLinkedList<string>();

  await assert(() => list.first === null);
  await assert(() => list.last === null);

  appendValueForDoublyLinkedList(list, 'a');

  await assert(() => list.first?.value === 'a');
  await assert(() => list.last?.value === 'a');
  checkDoublyLinkedListValues(list, ['a']);

  appendValueForDoublyLinkedList(list, 'b');

  await assert(() => list.first?.value === 'a');
  await assert(() => list.last?.value === 'b');
  checkDoublyLinkedListValues(list, ['a', 'b']);
}

export async function testDoublyLinkedListPrepend() {
  const list = createDoublyLinkedList<string>();

  prependValueForDoublyLinkedList(list, 'a');

  await assert(() => list.first?.value === 'a');
  await assert(() => list.last?.value === 'a');
  checkDoublyLinkedListValues(list, ['a']);

  prependValueForDoublyLinkedList(list, 'b');

  await assert(() => list.first?.value === 'b');
  await assert(() => list.last?.value === 'a');
  checkDoublyLinkedListValues(list, ['b', 'a']);
}

export async function testDoublyLinkedListInsertBefore() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b']);

  insertValueBeforeForDoublyLinkedList(list, 'c', list.first as IAttachedDoublyLinkedListNode<string>);
  checkDoublyLinkedListValues(list, ['c', 'a', 'b']);

  const d = insertValueBeforeForDoublyLinkedList(list, 'd', list.last as IAttachedDoublyLinkedListNode<string>);
  checkDoublyLinkedListValues(list, ['c', 'a', 'd', 'b']);

  insertValueBeforeForDoublyLinkedList(list, 'e', d);
  checkDoublyLinkedListValues(list, ['c', 'a', 'e', 'd', 'b']);
}


export async function testDoublyLinkedListInsertAfter() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b']);

  const c = insertValueAfterForDoublyLinkedList(list, 'c', list.first as IAttachedDoublyLinkedListNode<string>);
  checkDoublyLinkedListValues(list, ['a', 'c', 'b']);

  insertValueAfterForDoublyLinkedList(list, 'd', list.last as IAttachedDoublyLinkedListNode<string>);
  checkDoublyLinkedListValues(list, ['a', 'c', 'b', 'd']);

  insertValueAfterForDoublyLinkedList(list, 'e', c);
  checkDoublyLinkedListValues(list, ['a', 'c', 'e', 'b', 'd']);
}

export async function testDoublyLinkedListAttachAfter() {
  const list = createDoublyLinkedList<string>();

  const a = attachValueAfterForDoublyLinkedList(list, 'a', list.first);
  checkDoublyLinkedListValues(list, ['a']);

  attachValueAfterForDoublyLinkedList(list, 'b', list.last);
  checkDoublyLinkedListValues(list, ['a', 'b']);

  attachValueAfterForDoublyLinkedList(list, 'c', null);
  checkDoublyLinkedListValues(list, ['c', 'a', 'b']);

  attachValueAfterForDoublyLinkedList(list, 'd', a);
  checkDoublyLinkedListValues(list, ['c', 'a', 'd', 'b']);
}

export async function testDoublyLinkedListAttachBefore() {
  const list = createDoublyLinkedList<string>();

  const a = attachValueBeforeForDoublyLinkedList(list, 'a', list.first);
  checkDoublyLinkedListValues(list, ['a']);

  attachValueBeforeForDoublyLinkedList(list, 'b', list.last);
  checkDoublyLinkedListValues(list, ['b', 'a']);

  attachValueBeforeForDoublyLinkedList(list, 'c', null);
  checkDoublyLinkedListValues(list, ['b', 'a', 'c']);

  attachValueBeforeForDoublyLinkedList(list, 'd', a);
  checkDoublyLinkedListValues(list, ['b', 'd', 'a', 'c']);
}

export async function testDoublyLinkedListDetach() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b', 'c']);

  await assert(() => detachAttachedDoublyLinkedListNode(list.first as IAttachedDoublyLinkedListNode<string>).list === null);
  checkDoublyLinkedListValues(list, ['b', 'c']);

  await assert(() => detachAttachedDoublyLinkedListNode(list.last as IAttachedDoublyLinkedListNode<string>).list === null);
  checkDoublyLinkedListValues(list, ['b']);

  await assert(() => detachAttachedDoublyLinkedListNode(list.first as IAttachedDoublyLinkedListNode<string>).list === null);
  checkDoublyLinkedListValues(list, []);
}


export async function testDoublyLinkedListRemoveFirst() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b']);

  await assert(() => removeFirstValueOfDoublyLinkedList(list) === 'a');
  checkDoublyLinkedListValues(list, ['b']);

  await assert(() => removeFirstValueOfDoublyLinkedList(list) === 'b');
  checkDoublyLinkedListValues(list, []);

  await assert(() => removeFirstValueOfDoublyLinkedList(list) === void 0);
  checkDoublyLinkedListValues(list, []);
}

export async function testDoublyLinkedListRemoveLast() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b']);

  await assert(() => removeLastValueOfDoublyLinkedList(list) === 'b');
  checkDoublyLinkedListValues(list, ['a']);

  await assert(() => removeLastValueOfDoublyLinkedList(list) === 'a');
  checkDoublyLinkedListValues(list, []);

  await assert(() => removeLastValueOfDoublyLinkedList(list) === void 0);
  checkDoublyLinkedListValues(list, []);
}


export async function testDoublyLinkedListSize() {
  const list = createDoublyLinkedList<string>();
  await assert(() => getDoublyLinkedListSize(list) === 0);
  appendValueForDoublyLinkedList(list, 'a');
  await assert(() => getDoublyLinkedListSize(list) === 1);
}


export async function testDoublyLinkedListValueAtIndex() {
  const list = createDoublyLinkedListFromValues<string>(['a', 'b']);

  await assert(() => getRequiredValueAtIndexFromStartOfDoublyLinkedList(list, 0) === 'a');
  await assert(() => getRequiredValueAtIndexFromStartOfDoublyLinkedList(list, 1) === 'b');
  await assertFails(() => getRequiredValueAtIndexFromStartOfDoublyLinkedList(list, 2));

  setValueAtIndexFromStartOfDoublyLinkedList(list, 0, 'c');
  await assert(() => getRequiredValueAtIndexFromStartOfDoublyLinkedList(list, 0) === 'c');
  await assertFails(() => setValueAtIndexFromStartOfDoublyLinkedList(list, 2, 'z'));

  // TODO from end
}


/*------*/

export async function testDoublyLinkedList() {
  return runTests(async () => {
    await Promise.all([
      runTest('testDoublyLinkedListFromValues', testDoublyLinkedListFromValues),
      runTest('testDoublyLinkedListAppend', testDoublyLinkedListAppend),
      runTest('testDoublyLinkedListPrepend', testDoublyLinkedListPrepend),
      runTest('testDoublyLinkedListInsertBefore', testDoublyLinkedListInsertBefore),
      runTest('testDoublyLinkedListInsertAfter', testDoublyLinkedListInsertAfter),
      runTest('testDoublyLinkedListAttachAfter', testDoublyLinkedListAttachAfter),
      runTest('testDoublyLinkedListAttachBefore', testDoublyLinkedListAttachBefore),
      runTest('testDoublyLinkedListDetach', testDoublyLinkedListDetach),
      runTest('testDoublyLinkedListRemoveFirst', testDoublyLinkedListRemoveFirst),
      runTest('testDoublyLinkedListRemoveLast', testDoublyLinkedListRemoveLast),
      runTest('testDoublyLinkedListSize', testDoublyLinkedListSize),
      runTest('testDoublyLinkedListValueAtIndex', testDoublyLinkedListValueAtIndex),
    ]);
  });
}

