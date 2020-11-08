import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct, TPipePrivateContextFromGSelf } from '../pipe-struct';
import { Impl, TraitDeactivate } from '@lifaon/traits';

@Impl()
export class ImplTraitDeactivateForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitDeactivate<GSelf, GSelf> {
  deactivate(this: GSelf): GSelf {
    const context: TPipePrivateContextFromGSelf<GSelf> = this[PIPE_PRIVATE_CONTEXT];
    if (context.activated) {
      context.activated = false;
      context.observable.removeObserver(context.observer);
    }
    return this;
  }
}
