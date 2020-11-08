import { IObserverPrivateContext, IObserverStruct, OBSERVER_PRIVATE_CONTEXT, } from '../struct/observer-struct';
import { ImplTraitEmitForObserverStruct } from '../struct/implementations/observer-struct-emit-implementation';
import { TObserverEmitFunction } from '../observer-types';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

/** CONSTRUCTOR **/

export function ConstructObserver<GValue>(
  instance: IObserverStruct<GValue>,
  emit: TObserverEmitFunction<GValue>,
): void {
  if (typeof emit !== 'function') {
    throw new TypeError(`Expected function for argument 'emit'.`);
  }

  CreatePrivateContext<IObserverPrivateContext<GValue>>(
    OBSERVER_PRIVATE_CONTEXT,
    instance,
    {
      emit,
    },
  );
}

/** CLASS **/

export interface IObserver<GValue> extends IObserverStruct<GValue>,
  ImplTraitEmitForObserverStruct<IObserver<GValue>> {
}

export interface IAssembledObserverImplementations {
  new<GValue>(): IObserver<GValue>;
}

export const ObserverImplementationsCollection = [
  ImplTraitEmitForObserverStruct,
];

const AssembledObserverImplementations = AssembleTraitImplementations<IAssembledObserverImplementations>(ObserverImplementationsCollection);

export class Observer<GValue> extends AssembledObserverImplementations<GValue> implements IObserver<GValue> {
  readonly [OBSERVER_PRIVATE_CONTEXT]: IObserverPrivateContext<GValue>;

  constructor(emit: TObserverEmitFunction<GValue>) {
    super();
    ConstructObserver<GValue>(this, emit);
  }
}
