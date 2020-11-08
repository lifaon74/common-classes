import { Impl, TraitIterable } from '@lifaon/traits';
import { TGenericSuperIterator } from '../iterator-class';


@Impl()
export class ImplTraitIterableForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIterable<GSelf, GSelf> {
  [Symbol.iterator](this: GSelf): GSelf {
    return this;
  }
}
