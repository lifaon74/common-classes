import { IIteratorPrivateContext, IIteratorStruct, ITERATOR_PRIVATE_CONTEXT } from '../struct/iterator-struct';
import { ImplTraitNextForIteratorStruct } from '../struct/implementations/iterator-struct-next-implementation';
import { ImplTraitIteratorMapForSuperIterator } from './implementations/super-iterator-map-implementation';
import { ImplTraitIterableForSuperIterator } from './implementations/super-iterator-iterable-implementation';
import { ImplTraitIteratorFilterForSuperIterator } from './implementations/super-iterator-filter-implementation';
import { ImplTraitIteratorAsIndexedPairForSuperIterator } from './implementations/super-iterator-as-indexed-pair-implementation';
import { ImplTraitAsForIteratorStruct } from '../struct/implementations/iterator-struct-as-implementation';
import { ImplTraitIteratorDropForSuperIterator } from './implementations/super-iterator-drop-implementation';
import {
  AssembleTraitImplementations, CreatePrivateContext, TGenericIterable, TGenericIterator, TInferIterableGIterator,
  TInferIterableGNext, TInferIterableGReturn, TInferIterableGValue, TInferIteratorGNext, TInferIteratorGReturn,
  TInferIteratorGValue, TIteratorNextFunction
} from '@lifaon/traits';


/** CONSTRUCTOR **/

export function ConstructSuperIterator<GValue, GReturn, GNext>(
  instance: IIteratorStruct<GValue, GReturn, GNext>,
  next: TIteratorNextFunction<GValue, GReturn, GNext>,
): void {
  if (typeof next !== 'function') {
    throw new TypeError(`Expected function for argument 'next'.`);
  }

  CreatePrivateContext<IIteratorPrivateContext<GValue, GReturn, GNext>>(
    ITERATOR_PRIVATE_CONTEXT,
    instance,
    {
      next,
    },
  );
}

/** CLASS **/

export interface ISuperIterator<GValue, GReturn, GNext> extends IIteratorStruct<GValue, GReturn, GNext>,
  ImplTraitAsForIteratorStruct<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitNextForIteratorStruct<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitIterableForSuperIterator<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitIteratorAsIndexedPairForSuperIterator<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitIteratorDropForSuperIterator<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitIteratorFilterForSuperIterator<ISuperIterator<GValue, GReturn, GNext>>,
  ImplTraitIteratorMapForSuperIterator<ISuperIterator<GValue, GReturn, GNext>> {
}

export type TGenericSuperIterator = ISuperIterator<any, any, any>;

export type TInferSuperIteratorFromIterator<GIterator extends TGenericIterator> =
  ISuperIterator<TInferIteratorGValue<GIterator>, TInferIteratorGReturn<GIterator>, TInferIteratorGNext<GIterator>>;

export type TInferSuperIteratorFromIterable<GIterable extends TGenericIterable> =
  ISuperIterator<TInferIterableGValue<GIterable>, TInferIterableGReturn<GIterable>, TInferIterableGNext<GIterable>>;


export interface IAssembledSuperIteratorImplementations {
  new<GValue, GReturn, GNext>(): ISuperIterator<GValue, GReturn, GNext>;
}

export const SuperIteratorImplementationsCollection = [
  ImplTraitAsForIteratorStruct,
  ImplTraitNextForIteratorStruct,
  ImplTraitIterableForSuperIterator,
  ImplTraitIteratorAsIndexedPairForSuperIterator,
  ImplTraitIteratorDropForSuperIterator,
  ImplTraitIteratorFilterForSuperIterator,
  ImplTraitIteratorMapForSuperIterator,
];

const AssembledSuperIteratorImplementations = AssembleTraitImplementations<IAssembledSuperIteratorImplementations>(SuperIteratorImplementationsCollection);

export class SuperIterator<GValue, GReturn, GNext> extends AssembledSuperIteratorImplementations<GValue, GReturn, GNext> implements ISuperIterator<GValue, GReturn, GNext> {
  static fromIterator<GIterator extends TGenericIterator>(
    iterator: GIterator,
  ): TInferSuperIteratorFromIterator<GIterator> {
    return new SuperIterator<TInferIteratorGValue<GIterator>, TInferIteratorGReturn<GIterator>, TInferIteratorGNext<GIterator>>(
      iterator.next.bind(iterator) as TIteratorNextFunction<TInferIteratorGValue<GIterator>, TInferIteratorGReturn<GIterator>, TInferIteratorGNext<GIterator>>,
    );
  }

  static fromIterable<GIterable extends TGenericIterable>(
    iterable: GIterable,
  ): TInferSuperIteratorFromIterable<GIterable> {
    return SuperIterator.fromIterator<TInferIterableGIterator<GIterable>>(iterable[Symbol.iterator]());
  }

  readonly [ITERATOR_PRIVATE_CONTEXT]: IIteratorPrivateContext<GValue, GReturn, GNext>;

  constructor(next: TIteratorNextFunction<GValue, GReturn, GNext>) {
    super();
    ConstructSuperIterator<GValue, GReturn, GNext>(this, next);
  }
}


