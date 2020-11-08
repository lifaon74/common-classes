import { Impl, TraitActivate } from '@lifaon/traits';
import { ACTIVABLE_PRIVATE_CONTEXT, TGenericActivableStruct, TInferActivableStructGReturn } from '../activable-struct';

@Impl()
export class ImplTraitActivateForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitActivate<GSelf, TInferActivableStructGReturn<GSelf>> {
  activate(this: GSelf): TInferActivableStructGReturn<GSelf> {
    this[ACTIVABLE_PRIVATE_CONTEXT].isActivated = true;
    return this[ACTIVABLE_PRIVATE_CONTEXT].activate();
  }
}
