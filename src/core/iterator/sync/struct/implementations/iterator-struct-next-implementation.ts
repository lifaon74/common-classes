import {
  ITERATOR_PRIVATE_CONTEXT, TGenericIteratorStruct, TInferIteratorStructGNext, TInferIteratorStructGReturn,
  TInferIteratorStructGValue,
} from '../iterator-struct';
import { Impl, TraitIteratorNext, VoidArgument } from '@lifaon/traits';


@Impl()
export class ImplTraitNextForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitIteratorNext<GSelf, TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferIteratorStructGNext<GSelf>> {
  next(this: GSelf, ...value: VoidArgument<TInferIteratorStructGNext<GSelf>>): IteratorResult<TInferIteratorStructGValue<GSelf>, TInferIteratorStructGReturn<GSelf>> {
    return this[ITERATOR_PRIVATE_CONTEXT].next(...value);
  }
}
