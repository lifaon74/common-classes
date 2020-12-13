import { ITransformPrivateContext, ITransformStruct, TRANSFORM_PRIVATE_CONTEXT } from '../struct/transform-struct';
import { IsObservableLike, TGenericObservableLike } from '../../observable/built-in/simple/simple-observable-types';
import { IsObserverLike, TGenericObserverLike } from '../../observer/built-in/default/observer-types';
import { ImplTraitGetObservableForTransformStruct } from '../struct/implementations/transform-struct-get-observable-implementation';
import { ImplTraitGetObserverForTransformStruct } from '../struct/implementations/transform-struct-get-observer-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

/** CONSTRUCTOR **/

export function ConstructTransform<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(
  instance: ITransformStruct<GObserver, GObservable>,
  observer: GObserver,
  observable: GObservable,
): void {
  if (!IsObserverLike(observer)) {
    throw new TypeError(`The argument 'observer' is not an Observer.`);
  }

  if (!IsObservableLike(observable)) {
    throw new TypeError(`The argument 'observable' is not an Observable.`);
  }

  CreatePrivateContext<ITransformPrivateContext<GObserver, GObservable>>(
    TRANSFORM_PRIVATE_CONTEXT,
    instance,
    {
      observable,
      observer,
    },
  );
}

/** CLASS **/

export interface ITransformImplementation<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends
  // implementations
  ImplTraitGetObservableForTransformStruct<ITransform<GObserver, GObservable>, GObservable>,
  ImplTraitGetObserverForTransformStruct<ITransform<GObserver, GObservable>, GObserver>
  //
{
}

export const TransformImplementations = [
  ImplTraitGetObservableForTransformStruct,
  ImplTraitGetObserverForTransformStruct,
];


export interface ITransformImplementationsConstructor {
  new<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike>(): ITransformImplementation<GObserver, GObservable>;
}


export interface ITransform<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends ITransformStruct<GObserver, GObservable>, ITransformImplementation<GObserver, GObservable> {
}

const TransformImplementationsConstructor = AssembleTraitImplementations<ITransformImplementationsConstructor>(TransformImplementations);

export class Transform<GObserver extends TGenericObserverLike, GObservable extends TGenericObservableLike> extends TransformImplementationsConstructor<GObserver, GObservable> implements ITransform<GObserver, GObservable> {
  readonly [TRANSFORM_PRIVATE_CONTEXT]: ITransformPrivateContext<GObserver, GObservable>;

  constructor(
    observer: GObserver,
    observable: GObservable,
  ) {
    super();
    ConstructTransform<GObserver, GObservable>(this, observer, observable);
  }
}
