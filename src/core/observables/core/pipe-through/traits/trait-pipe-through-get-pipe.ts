import { Trait } from '@lifaon/traits';
import { TGenericPipeLike } from '../../pipe/pipe-types';

@Trait()
export abstract class TraitPipeThroughGetPipe<GSelf, GPipe extends TGenericPipeLike> {
  abstract getPipe(this: GSelf): GPipe;
}
