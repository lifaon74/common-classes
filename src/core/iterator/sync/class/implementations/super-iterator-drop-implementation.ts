import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import {
  Impl, IteratorDrop, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue, TraitIteratorDrop
} from '@lifaon/traits';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';

@Impl()
export class ImplTraitIteratorDropForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorDrop<GSelf> {
  drop(this: GSelf, limit: number): ISuperIterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<TInferTraitIteratorNextGValue<GSelf>, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorDrop<TInferTraitIteratorNextGValue<GSelf>, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, limit),
    );
  }
}
