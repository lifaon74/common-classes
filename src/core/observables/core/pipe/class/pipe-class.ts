import { IPipePrivateContext, IPipeStruct, PIPE_PRIVATE_CONTEXT } from '../struct/pipe-struct';
import {
  IsObservableLike, TGenericObservableLike, TInferObservableLikeGObserver,
} from '../../observable/observable-types';
import { IsObserverLike } from '../../observer/observer-types';
import { ImplTraitToggleForPipeStruct } from '../struct/implementations/pipe-struct-toggle-implementation';
import { ImplTraitGetObservableForPipeStruct } from '../struct/implementations/pipe-struct-get-observable-implementation';
import { ImplTraitGetObserverForPipeStruct } from '../struct/implementations/pipe-struct-get-observer-implementation';
import { ImplTraitIsActivatedForPipeStruct } from '../struct/implementations/pipe-struct-is-activated-implementation';
import { ImplTraitActivateForPipeStruct } from '../struct/implementations/pipe-struct-activate-implementation';
import { ImplTraitDeactivateForPipeStruct } from '../struct/implementations/pipe-struct-deactivate-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

/** CONSTRUCTOR **/

export function ConstructPipe<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>>(
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

export interface IPipe<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>> extends IPipeStruct<GObservable, GObserver>,
  ImplTraitGetObservableForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitGetObserverForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitIsActivatedForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitActivateForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitDeactivateForPipeStruct<IPipe<GObservable, GObserver>>,
  ImplTraitToggleForPipeStruct<IPipe<GObservable, GObserver>> {
}

export interface IAssembledPipeImplementations {
  new<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>>(): IPipe<GObservable, GObserver>;
}

export const PipeImplementationsCollection = [
  ImplTraitGetObservableForPipeStruct,
  ImplTraitGetObserverForPipeStruct,
  ImplTraitIsActivatedForPipeStruct,
  ImplTraitActivateForPipeStruct,
  ImplTraitDeactivateForPipeStruct,
  ImplTraitToggleForPipeStruct,
];

const AssembledPipeImplementations = AssembleTraitImplementations<IAssembledPipeImplementations>(PipeImplementationsCollection);

export class Pipe<GObservable extends TGenericObservableLike, GObserver extends TInferObservableLikeGObserver<GObservable>> extends AssembledPipeImplementations<GObservable, GObserver> implements IPipe<GObservable, GObserver> {
  readonly [PIPE_PRIVATE_CONTEXT]: IPipePrivateContext<GObservable, GObserver>;

  constructor(
    observable: GObservable,
    observer: GObserver,
  ) {
    super();
    ConstructPipe<GObservable, GObserver>(this, observable, observer);
  }
}
