import {
  IIteratorPrivateContext, ITERATOR_PRIVATE_CONTEXT, TGenericIteratorStruct, TInferIteratorStructGNext,
  TInferIteratorStructGReturn, TInferIteratorStructGValue,
} from '../iterator-struct';
import { Impl, TraitIterable } from '@lifaon/traits';


@Impl()
export class ImplTraitIterableForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitIterable<GSelf, IIteratorPrivateContext<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>>> {
  [Symbol.iterator](this: GSelf): IIteratorPrivateContext<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>> {
    return this[ITERATOR_PRIVATE_CONTEXT];
  }
}
