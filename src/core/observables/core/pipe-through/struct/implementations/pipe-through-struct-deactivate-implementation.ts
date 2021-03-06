import {
  PIPE_THROUGH_PRIVATE_CONTEXT, TGenericPipeThroughPrivateContext, TGenericPipeThroughStruct,
} from '../pipe-through-struct';
import { Impl, TraitDeactivate } from '@lifaon/traits';

@Impl()
export class ImplTraitDeactivateForPipeThroughStruct<GSelf extends TGenericPipeThroughStruct> extends TraitDeactivate<GSelf, GSelf> {
  deactivate(this: GSelf): GSelf {
    const context: TGenericPipeThroughPrivateContext = this[PIPE_THROUGH_PRIVATE_CONTEXT];
    if (context.undo !== null) {
      context.undo();
      context.undo = null;
    }
    return this;
  }
}
