import { PIPE_PRIVATE_CONTEXT, TGenericPipeStruct } from '../pipe-struct';
import { Impl, TraitIsActivated } from '@lifaon/traits';

@Impl()
export class ImplTraitIsActivatedForPipeStruct<GSelf extends TGenericPipeStruct> extends TraitIsActivated<GSelf> {
  isActivated(this: GSelf): boolean {
    return this[PIPE_PRIVATE_CONTEXT].activated;
  }
}
