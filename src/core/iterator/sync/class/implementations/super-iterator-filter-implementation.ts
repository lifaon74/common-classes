import {
  Impl, IteratorFilter, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue, TIteratorFilterCallback,
  TraitIteratorFilter
} from '@lifaon/traits';
import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';


@Impl()
export class ImplTraitIteratorFilterForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorFilter<GSelf> {
  filter(
    this: GSelf,
    callback: TIteratorFilterCallback<TInferTraitIteratorNextGValue<GSelf>>,
  ): ISuperIterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorFilter<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, callback),
    );
  }
}
