import { PROGRESS_PRIVATE_CONTEXT, TGenericProgressStruct } from '../progress-struct';
import { Impl } from '@lifaon/traits';
import { TraitProgressGetTotal } from '../../traits/trait-progress-get-total';


@Impl()
export class ImplTraitGetTotalForProgressStruct<GSelf extends TGenericProgressStruct> extends TraitProgressGetTotal<GSelf> {
  getTotal(this: GSelf): number {
    return this[PROGRESS_PRIVATE_CONTEXT].total;
  }
}
