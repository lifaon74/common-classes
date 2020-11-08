import { Impl, TraitDeactivate } from '@lifaon/traits';
import { ACTIVABLE_PRIVATE_CONTEXT, TGenericActivableStruct, TInferActivableStructGReturn } from '../activable-struct';

@Impl()
export class ImplTraitDeactivateForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitDeactivate<GSelf, TInferActivableStructGReturn<GSelf>> {
  deactivate(this: GSelf): TInferActivableStructGReturn<GSelf> {
    this[ACTIVABLE_PRIVATE_CONTEXT].isActivated = false;
    return this[ACTIVABLE_PRIVATE_CONTEXT].deactivate();
  }
}
