import { IPipePrivateContext, IPipeStruct, PIPE_PRIVATE_CONTEXT } from '../struct/pipe-struct';
import { IObservableLike, IsObservableLike, } from '../../observable/observable-types';
import { IsObserverLike, TGenericObserverLike } from '../../observer/observer-types';
import { ImplTraitToggleForPipeStruct } from '../struct/implementations/pipe-struct-toggle-implementation';
import { ImplTraitGetObservableForPipeStruct } from '../struct/implementations/pipe-struct-get-observable-implementation';
import { ImplTraitGetObserverForPipeStruct } from '../struct/implementations/pipe-struct-get-observer-implementation';
import { ImplTraitIsActivatedForPipeStruct } from '../struct/implementations/pipe-struct-is-activated-implementation';
import { ImplTraitActivateForPipeStruct } from '../struct/implementations/pipe-struct-activate-implementation';
import { ImplTraitDeactivateForPipeStruct } from '../struct/implementations/pipe-struct-deactivate-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

/** CONSTRUCTOR **/

export function ConstructPipe<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike>(
  instance: IPipeStruct<GObservable, GObserver>,
  observable: GObservable,
  observer: GObserver,
): void {
  if (!IsObservableLike(observable)) {
    throw new TypeError(`The argument 'observable' is not an Observable.`);
  }

  if (!IsObserverLike(observer)) {
    throw new TypeError(`The argument 'observer' is not an Observer.`);
  }

  CreatePrivateContext<IPipePrivateContext<GObservable, GObserver>>(
    PIPE_PRIVATE_CONTEXT,
    instance,
    {
      observable,
      observer,
      activated: false,
    },
  );
}

/** CLASS **/

export interface IPipeImplementations<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends
  // own implementations coming from activable
  ImplTraitIsActivatedForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitActivateForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitDeactivateForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitToggleForPipeStruct<IPipe<GObservable, GObserver>>,
  // own implementations
  ImplTraitGetObservableForPipeStruct<IPipe<GObservable, GObserver>, GObservable>,
  ImplTraitGetObserverForPipeStruct<IPipe<GObservable, GObserver>, GObserver>
  //
{
}

export const PipeImplementations = [
  // own implementations coming from activable
  ImplTraitIsActivatedForPipeStruct,
  ImplTraitActivateForPipeStruct,
  ImplTraitDeactivateForPipeStruct,
  ImplTraitToggleForPipeStruct,
  // own implementations
  ImplTraitGetObservableForPipeStruct,
  ImplTraitGetObserverForPipeStruct,
];

export interface IPipeImplementationsConstructor {
  new<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike>(): IPipeImplementations<GObservable, GObserver>;
}


export interface IPipe<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends IPipeStruct<GObservable, GObserver>, IPipeImplementations<GObservable, GObserver> {
}

const PipeImplementationsConstructor = AssembleTraitImplementations<IPipeImplementationsConstructor>(PipeImplementations);

export class Pipe<GObservable extends IObservableLike<GObserver>, GObserver extends TGenericObserverLike> extends PipeImplementationsConstructor<GObservable, GObserver> implements IPipe<GObservable, GObserver> {
  readonly [PIPE_PRIVATE_CONTEXT]: IPipePrivateContext<GObservable, GObserver>;

  constructor(
    observable: GObservable,
    observer: GObserver,
  ) {
    super();
    ConstructPipe<GObservable, GObserver>(this, observable, observer);
  }
}
