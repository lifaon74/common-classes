import { Impl, TraitAs } from '@lifaon/traits';
import { TGenericIteratorStruct } from '../iterator-struct';

@Impl()
export class ImplTraitAsForIteratorStruct<GSelf extends TGenericIteratorStruct> extends TraitAs<GSelf> {
}
