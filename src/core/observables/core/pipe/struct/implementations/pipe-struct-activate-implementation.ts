import { PIPE_PRIVATE_CONTEXT, TGenericPipePrivateContext, TGenericPipeStruct } from '../pipe-struct';
import { Impl, TraitActivate } from '@lifaon/traits';

@Impl()
export class ImplTraitActivateForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitActivate<GSelf, GSelf> {
  activate(this: GSelf): GSelf {
    const context: TGenericPipePrivateContext = this[PIPE_PRIVATE_CONTEXT];
    if (!context.activated) {
      context.activated = true;
      context.observable.addObserver(context.observer);
    }
    return this;
  }
}
