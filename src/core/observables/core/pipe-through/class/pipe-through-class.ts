import {
  IPipeThroughPrivateContext, IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT,
} from '../struct/pipe-through-struct';
import {
  IsObservableLike, TGenericObservableLike, TInferObservableLikeGObserver,
} from '../../observable/observable-types';
import { ImplTraitToggleForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-toggle-implementation';
import { ImplTraitGetObservableForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-get-observable-implementation';
import { ImplTraitIsActivatedForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-is-activated-implementation';
import { ImplTraitActivateForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-activate-implementation';
import { ImplTraitDeactivateForPipeThroughStruct } from '../struct/implementations/pipe-through-struct-deactivate-implementation';
import { TPipeThroughLikeGTransformConstraintWithEventListenerOn } from '../pipe-through-types';
import { IsTransformLike, TInferTransformLikeGObservable } from '../../transform/transform-types';
import { Pipe } from '../../pipe/class/pipe-class';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';

/** CONSTRUCTOR **/

export function ConstructPipeThrough<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>>(
  instance: IPipeThroughStruct<GObservable, GTransform>,
  observable: GObservable,
  transform: GTransform,
): void {
  if (!IsObservableLike(observable)) {
    throw new TypeError(`The argument 'observable' is not an Observable.`);
  }

  if (!IsTransformLike(transform)) {
    throw new TypeError(`The argument 'transform' is not a Transform.`);
  }

  CreatePrivateContext<IPipeThroughPrivateContext<GObservable, GTransform>>(
    PIPE_THROUGH_PRIVATE_CONTEXT,
    instance,
    {
      observable: transform.getObservable() as TInferTransformLikeGObservable<GTransform>,
      pipe: new Pipe<GObservable, TInferObservableLikeGObserver<GObservable>>(observable, transform.getObserver()),
      undo: null,
    },
  );
}

/** CLASS **/

export interface IPipeThrough<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>> extends IPipeThroughStruct<GObservable, GTransform>,
  ImplTraitGetObservableForPipeThroughStruct<IPipeThrough<GObservable, GTransform>>,
  ImplTraitIsActivatedForPipeThroughStruct<IPipeThrough<GObservable, GTransform>>,
  ImplTraitActivateForPipeThroughStruct<IPipeThrough<GObservable, GTransform>>,
  ImplTraitDeactivateForPipeThroughStruct<IPipeThrough<GObservable, GTransform>>,
  ImplTraitToggleForPipeThroughStruct<IPipeThrough<GObservable, GTransform>> {
}

export interface IAssembledPipeThroughImplementations {
  new<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>>(): IPipeThrough<GObservable, GTransform>;
}

export const PipeThroughImplementationsCollection = [
  ImplTraitGetObservableForPipeThroughStruct,
  ImplTraitIsActivatedForPipeThroughStruct,
  ImplTraitActivateForPipeThroughStruct,
  ImplTraitDeactivateForPipeThroughStruct,
  ImplTraitToggleForPipeThroughStruct,
];

const AssembledPipeThroughImplementations = AssembleTraitImplementations<IAssembledPipeThroughImplementations>(PipeThroughImplementationsCollection);

export class PipeThrough<GObservable extends TGenericObservableLike, GTransform extends TPipeThroughLikeGTransformConstraintWithEventListenerOn<GObservable>> extends AssembledPipeThroughImplementations<GObservable, GTransform> implements IPipeThrough<GObservable, GTransform> {
  readonly [PIPE_THROUGH_PRIVATE_CONTEXT]: IPipeThroughPrivateContext<GObservable, GTransform>;

  constructor(
    observable: GObservable,
    transform: GTransform,
  ) {
    super();
    ConstructPipeThrough<GObservable, GTransform>(this, observable, transform);
  }
}
