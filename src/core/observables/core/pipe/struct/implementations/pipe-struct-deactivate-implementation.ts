import { PIPE_PRIVATE_CONTEXT, TGenericPipePrivateContext, TGenericPipeStruct } from '../pipe-struct';
import { Impl, TraitDeactivate } from '@lifaon/traits';

@Impl()
export class ImplTraitDeactivateForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitDeactivate<GSelf, GSelf> {
  deactivate(this: GSelf): GSelf {

    const context: TGenericPipePrivateContext = this[PIPE_PRIVATE_CONTEXT];
    if (context.activated) {
      context.activated = false;
      context.observable.removeObserver(context.observer);
    }
    return this;
  }
}
