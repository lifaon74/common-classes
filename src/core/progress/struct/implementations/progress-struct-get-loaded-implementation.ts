import { PROGRESS_PRIVATE_CONTEXT, TGenericProgressStruct } from '../progress-struct';
import { Impl } from '@lifaon/traits';
import { TraitProgressGetLoaded } from '../../traits/trait-progress-get-loaded';


@Impl()
export class ImplTraitGetLoadedForProgressStruct<GSelf extends TGenericProgressStruct> extends TraitProgressGetLoaded<GSelf> {
  getLoaded(this: GSelf): number {
    return this[PROGRESS_PRIVATE_CONTEXT].loaded;
  }
}
