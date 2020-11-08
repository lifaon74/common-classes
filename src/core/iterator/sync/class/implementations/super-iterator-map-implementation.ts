import { ISuperIterator, SuperIterator, TGenericSuperIterator } from '../iterator-class';
import {
  Impl, IteratorMap, TInferTraitIteratorNextGNext, TInferTraitIteratorNextGValue, TIteratorMapCallback, TraitIteratorMap
} from '@lifaon/traits';
import { TInferIteratorStructGReturn } from '../../struct/iterator-struct';


@Impl()
export class ImplTraitIteratorMapForSuperIterator<GSelf extends TGenericSuperIterator> extends TraitIteratorMap<GSelf> {
  map<GMappedValue>(
    this: GSelf,
    callback: TIteratorMapCallback<TInferTraitIteratorNextGValue<GSelf>, GMappedValue>,
  ): ISuperIterator<GMappedValue, void, TInferTraitIteratorNextGNext<GSelf>> {
    return SuperIterator.fromIterator<Iterator<GMappedValue, void, TInferTraitIteratorNextGNext<GSelf>>>(
      IteratorMap<TInferTraitIteratorNextGValue<GSelf>, GMappedValue, TInferIteratorStructGReturn<GSelf>, TInferTraitIteratorNextGNext<GSelf>>(this, callback),
    );
  }
}
