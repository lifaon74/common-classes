import { IObservablePrivateContext, IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT, } from '../struct/observable-struct';
import { IsObserverLike, TGenericObserverLike, TInferObserverLikeGValue } from '../../../observer/built-in/default/observer-types';
import { ConstructEventListener, } from '../../../../../event-listener/raw/class/event-listener-class';
import { ImplTraitIsActiveForObservableStruct } from '../struct/implementations/observable-struct-is-active-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { TObservableCreateFunction, TObservableKeyValueTupleUnion } from '../../built-in/simple/simple-observable-types';
import { ImplTraitEventListenerIsDispatchingForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-is-dispatching-implementation';
import { ImplTraitEventListenerOnForEventListenerStruct } from '../../../../../event-listener/raw/struct/implementations/event-listener-struct-on-implementation';
import { ImplTraitAddObserverForObservableStruct } from '../struct/implementations/observable-struct-add-observer/observable-struct-add-observer-implementation';
import { ImplTraitRemoveObserverForObservableStruct } from '../struct/implementations/observable-struct-remove-observer/observable-struct-remove-observer-implementation';
import { ObservableStructEmitAll } from '../struct/functions/observable-struct-emit-all';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext
} from '../../../../../event-listener/raw/struct/event-listener-struct';
import { ImplTraitObservablePipeToForObservableStruct } from '../struct/implementations/observable-struct-pipe-to-implementation';
import { ImplTraitObservablePipeThroughForObservableStruct } from '../struct/implementations/observable-struct-pipe-through-implementation';
import { ImplTraitObservablePipeThroughSoftForObservableStruct } from '../struct/implementations/observable-struct-pipe-through-soft-implementation';
import { DOT_NOT_VERIFY_TYPES } from '../../../../../verify-types';


/** FUNCTIONS **/


export function ConstructObservable<GObserver extends TGenericObserverLike>(
  instance: IObservable<GObserver>,
  create: TObservableCreateFunction<GObserver>,
): void {
  ConstructEventListener<TObservableKeyValueTupleUnion<GObserver>>(instance);
  CreatePrivateContext<IObservablePrivateContext<GObserver>>(
    OBSERVABLE_PRIVATE_CONTEXT,
    instance,
    {
      observers: [],
    },
  );

  if (DOT_NOT_VERIFY_TYPES || (typeof create === 'function')) {
    let isDispatching: boolean = false;
    create((value: TInferObserverLikeGValue<GObserver>) => {
      if (isDispatching) {
        throw new Error(`Operation is not permitted: the observable is currently dispatching a value`);
      } else {
        isDispatching = true;
        ObservableStructEmitAll<GObserver>(instance, value);
        isDispatching = false;
      }
    }, instance);
  } else {
    throw new TypeError(`Expected function for argument 'create'.`);
  }
}

/** CLASS **/

export interface IObservableImplementations<GObserver extends TGenericObserverLike> extends
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<IObservable<GObserver>>,
  ImplTraitEventListenerOnForEventListenerStruct<IObservable<GObserver>, TObservableKeyValueTupleUnion<GObserver>>,

  // own implementations
  ImplTraitIsActiveForObservableStruct<IObservable<GObserver>>,
  ImplTraitAddObserverForObservableStruct<IObservable<GObserver>, GObserver>,
  ImplTraitRemoveObserverForObservableStruct<IObservable<GObserver>, GObserver>,
  ImplTraitObservablePipeToForObservableStruct<IObservable<GObserver>, GObserver>,
  ImplTraitObservablePipeThroughSoftForObservableStruct<IObservable<GObserver>>,
  ImplTraitObservablePipeThroughForObservableStruct<IObservable<GObserver>>
  //
{
}

export const ObservableImplementations = [
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,

  // own implementations
  ImplTraitIsActiveForObservableStruct,
  ImplTraitAddObserverForObservableStruct,
  ImplTraitRemoveObserverForObservableStruct,
  ImplTraitObservablePipeToForObservableStruct,
  ImplTraitObservablePipeThroughSoftForObservableStruct,
  ImplTraitObservablePipeThroughForObservableStruct,
];

export interface IObservableImplementationsConstructor {
  new<GObserver extends TGenericObserverLike>(): IObservableImplementations<GObserver>;
}


export interface IObservable<GObserver extends TGenericObserverLike> extends IObservableStruct<GObserver>, IObservableImplementations<GObserver> {
}

const ObservableImplementationsConstructor = AssembleTraitImplementations<IObservableImplementationsConstructor>(ObservableImplementations);

export class Observable<GObserver extends TGenericObserverLike> extends ObservableImplementationsConstructor<GObserver> implements IObservable<GObserver> {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<TObservableKeyValueTupleUnion<GObserver>>;
  readonly [OBSERVABLE_PRIVATE_CONTEXT]: IObservablePrivateContext<GObserver>;

  constructor(create: TObservableCreateFunction<GObserver>) {
    super();
    ConstructObservable<GObserver>(this, create);
  }
}
