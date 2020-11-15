import { IObservablePrivateContext, IObservableStruct, OBSERVABLE_PRIVATE_CONTEXT, } from '../struct/observable-struct';
import { TGenericObserverLike, TInferObserverLikeGValue } from '../../observer/observer-types';
import { ObservableStructDispatchAll } from '../struct/functions/observable-struct-functions';
import {
  ConstructEventListener, EventListenerImplementationsCollection, IEventListener,
} from '../../../../event-listener/raw/class/event-listener-class';
import { ImplTraitIsActiveForObservableStruct } from '../struct/implementations/observable-struct-is-active-implementation';
import { ImplTraitAddObserverForObservableStruct } from '../struct/implementations/observable-struct-add-observer-implementation';
import { ImplTraitRemoveObserverForObservableStruct } from '../struct/implementations/observable-struct-remove-observer-implementation';
import { ImplTraitObservablePipeToForObservableStruct } from '../struct/implementations/observable-struct-pipe-to-implementation';
import { ImplTraitObservablePipeThroughSoftForObservableStruct } from '../struct/implementations/observable-struct-pipe-through-soft-implementation';
import { ImplTraitObservablePipeThroughForObservableStruct } from '../struct/implementations/observable-struct-pipe-through-implementation';
import { IObservableEventMap } from '../observable-types';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';


/** TYPES **/


export type TObservableEmitFunction<GValue> = (value: GValue) => void;

export type TObservableEmitFunctionFromObserver<GObserver extends TGenericObserverLike> = TObservableEmitFunction<TInferObserverLikeGValue<GObserver>>;

export type TObservableCreateFunction<GObserver extends TGenericObserverLike> = (emit: TObservableEmitFunctionFromObserver<GObserver>, observable: IObservable<GObserver>) => void;


/** FUNCTIONS **/


export function ConstructObservable<GObserver extends TGenericObserverLike>(
  instance: IObservable<GObserver>,
  create?: TObservableCreateFunction<GObserver>,
): void {
  ConstructEventListener<IObservableEventMap<GObserver>>(instance);
  CreatePrivateContext<IObservablePrivateContext<GObserver>>(
    OBSERVABLE_PRIVATE_CONTEXT,
    instance,
    {
      observers: [],
    },
  );

  if (typeof create === 'function') {
    let isDispatching: boolean = false;
    create((value: TInferObserverLikeGValue<GObserver>) => {
      if (isDispatching) {
        throw new Error(`Operation is not permitted: the observable is currently dispatching a value`);
      } else {
        isDispatching = true;
        ObservableStructDispatchAll(instance, value);
        isDispatching = false;
      }
    }, instance);
  } else if (create !== void 0) {
    throw new TypeError(`Expected function or void for argument 'create'.`);
  }
}

/** CLASS **/

export interface IObservable<GObserver extends TGenericObserverLike> extends IObservableStruct<GObserver>,
  ImplTraitIsActiveForObservableStruct<IObservable<GObserver>>,
  ImplTraitAddObserverForObservableStruct<IObservable<GObserver>>,
  ImplTraitRemoveObserverForObservableStruct<IObservable<GObserver>>,
  ImplTraitObservablePipeToForObservableStruct<IObservable<GObserver>>,
  ImplTraitObservablePipeThroughSoftForObservableStruct<IObservable<GObserver>>,
  ImplTraitObservablePipeThroughForObservableStruct<IObservable<GObserver>>,
  IEventListener<IObservableEventMap<GObserver>> {
}


export interface IAssembledObservableImplementations {
  new<GObserver extends TGenericObserverLike>(): IObservable<GObserver>;
}

export const ObservableImplementationsCollection = [
  ...EventListenerImplementationsCollection,
  ImplTraitIsActiveForObservableStruct,
  ImplTraitAddObserverForObservableStruct,
  ImplTraitRemoveObserverForObservableStruct,
  ImplTraitObservablePipeToForObservableStruct,
  ImplTraitObservablePipeThroughSoftForObservableStruct,
  ImplTraitObservablePipeThroughForObservableStruct,
];

const AssembledObservableImplementations = AssembleTraitImplementations<IAssembledObservableImplementations>(ObservableImplementationsCollection);

export class Observable<GObserver extends TGenericObserverLike> extends AssembledObservableImplementations<GObserver> implements IObservable<GObserver> {
  readonly [OBSERVABLE_PRIVATE_CONTEXT]: IObservablePrivateContext<GObserver>;

  constructor(create?: TObservableCreateFunction<GObserver>) {
    super();
    ConstructObservable<GObserver>(this, create);
  }
}
