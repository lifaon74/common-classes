import {
  IPipeThroughPrivateContext, IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT,
} from '../struct/pipe-through-struct';
import {
  IsObservableLike, TGenericObservableLike, TInferObservableLikeGObserver,
} from '../../observable/observable-types';
import { ImplTraitToggleForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-toggle-implementation';
import { ImplTraitIsActivatedForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-is-activated-implementation';
import { ImplTraitActivateForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-activate-implementation';
import { ImplTraitDeactivateForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-deactivate-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import {
  TGenericObservableLikeWithEventListenerOnForActiveAndInactive, TInferPipeThroughLikeFromObservableAndTransform,
  TPipeThroughLikeGTransformConstraintWithEventListenerOn
} from '../pipe-through-types';
import { IPipeLike, IsPipeLike, TGenericPipeLike } from '../../pipe/pipe-types';
import { ImplTraitGetPipeForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-get-pipe-implementation';
import { ImplTraitGetObservableForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-get-observable-implementation';
import { TInferTransformLikeGObservable } from '../../transform/transform-types';
import { Pipe } from '../../pipe/class/pipe-class';

/** CONSTRUCTOR **/

export function ConstructPipeThrough<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
  //
  >(
  instance: IPipeThroughStruct<GPipe, GObservable>,
  pipe: GPipe,
  observable: GObservable,
): void {
  if (!IsPipeLike(pipe)) {
    throw new TypeError(`The argument 'pipe' is not a Pipe.`);
  }

  if (!IsObservableLike(observable)) {
    throw new TypeError(`The argument 'observable' is not an Observable.`);
  }

  CreatePrivateContext<IPipeThroughPrivateContext<GPipe, GObservable>>(
    PIPE_THROUGH_PRIVATE_CONTEXT,
    instance,
    {
      pipe,
      observable,
      undo: null,
    },
  );
}

/** CLASS **/

export interface IPipeThroughImplementations<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
  //
  > extends
  // own implementations coming from activable
  ImplTraitIsActivatedForPipeThroughStruct<IPipeThrough<GPipe, GObservable>>,
  ImplTraitActivateForPipeThroughStruct<IPipeThrough<GPipe, GObservable>, GObservable>,
  ImplTraitDeactivateForPipeThroughStruct<IPipeThrough<GPipe, GObservable>>,
  ImplTraitToggleForPipeThroughStruct<IPipeThrough<GPipe, GObservable>>,
  // own implementations
  ImplTraitGetPipeForPipeThroughStruct<IPipeThrough<GPipe, GObservable>, GPipe>,
  ImplTraitGetObservableForPipeThroughStruct<IPipeThrough<GPipe, GObservable>, GObservable>
  //
{
}

export const PipeThroughImplementations = [
  // own implementations coming from activable
  ImplTraitIsActivatedForPipeThroughStruct,
  ImplTraitActivateForPipeThroughStruct,
  ImplTraitDeactivateForPipeThroughStruct,
  ImplTraitToggleForPipeThroughStruct,
  // own implementations
  ImplTraitGetPipeForPipeThroughStruct,
  ImplTraitGetObservableForPipeThroughStruct,
];

export interface IPipeThroughImplementationsConstructor {
  new<// generics
    GPipe extends TGenericPipeLike,
    GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
    //
    >(): IPipeThroughImplementations<GPipe, GObservable>;
}

export interface IPipeThrough<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
  //
  > extends IPipeThroughStruct<GPipe, GObservable>, IPipeThroughImplementations<GPipe, GObservable> {
}

const PipeThroughImplementationsConstructor = AssembleTraitImplementations<IPipeThroughImplementationsConstructor>(PipeThroughImplementations);

export class PipeThrough<// generics
  GPipe extends TGenericPipeLike,
  GObservable extends TGenericObservableLikeWithEventListenerOnForActiveAndInactive
  //
  > extends PipeThroughImplementationsConstructor<GPipe, GObservable> implements IPipeThrough<GPipe, GObservable> {

  static fromTransform<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>>(
    observable: GObservable,
    transform: GTransform,
  ): TInferPipeThroughLikeFromObservableAndTransform<GObservable, GTransform> {
    return new PipeThrough<IPipeLike<GObservable, TInferObservableLikeGObserver<GObservable>>, TInferTransformLikeGObservable<GTransform>>(
      new Pipe<GObservable, TInferObservableLikeGObserver<GObservable>>(observable, transform.getObserver()),
      transform.getObservable() as TInferTransformLikeGObservable<GTransform>,
    );
  }

  readonly [PIPE_THROUGH_PRIVATE_CONTEXT]: IPipeThroughPrivateContext<GPipe, GObservable>;

  constructor(
    pipe: GPipe,
    observable: GObservable,
  ) {
    super();
    ConstructPipeThrough<GPipe, GObservable>(
      this,
      pipe,
      observable,
    );
  }
}
