import { PIPE_THROUGH_PRIVATE_CONTEXT, TGenericPipeThroughStruct } from '../pipe-through-struct';
import { Impl, TraitIsActivated } from '@lifaon/traits';


@Impl()
export class ImplTraitIsActivatedForPipeThroughStruct<GSelf extends TGenericPipeThroughStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[PIPE_THROUGH_PRIVATE_CONTEXT].undo !== null;
  }
}
