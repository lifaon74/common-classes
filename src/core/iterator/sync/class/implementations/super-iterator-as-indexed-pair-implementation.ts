import {
  Impl, IteratorAsIndexedPair, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue, TraitIteratorAsIndexedPair
} from '@lifaon/traits';
import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';

@Impl()
export class ImplTraitIteratorAsIndexedPairForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorAsIndexedPair<GSelf> {
  asIndexedPair(
    this: GSelf,
  ): ISuperIterator<[TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<[TInferTraitIteratorNextGValue<GSelf>, number], void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorAsIndexedPair<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this),
    );
  }
}
