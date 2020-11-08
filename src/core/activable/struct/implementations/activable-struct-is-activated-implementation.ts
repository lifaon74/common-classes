import { Impl, TraitIsActivated } from '@lifaon/traits';
import { ACTIVABLE_PRIVATE_CONTEXT, TGenericActivableStruct } from '../activable-struct';

@Impl()
export class ImplTTraitIsActivatedForActivableStruct<GSelf extends TGenericActivableStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[ACTIVABLE_PRIVATE_CONTEXT].isActivated;
  }
}
