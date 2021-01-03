import { Trait } from '@lifaon/traits';

/**
 * - if 'before' and 'this' are in the same list:
 *    - splits the list:
 *      - ['this', ...to 'before'[ => ['this', ...to 'before'.previous]
 *      - and ['before', ...to 'this'[ => ['before', ...to 'this'.previous]
 * - if 'before' and 'this' are NOT in the same list:
 *    - concat 'this' list with the 'before' list:
 *      - prepends 'this' list before the 'before' list
 *      - OR appends 'this' list after the 'before' list (because they're circular)
 *      - ['this', ...to last of 'this' list ('this'.previous), 'before', ...to last of 'before' list ('before'.previous)]
 */
@Trait()
export abstract class TraitDoublyLinkedListNodeEntangle<GSelf> {
  abstract entangle(this: GSelf, before: GSelf): void;
}


