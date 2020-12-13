import { IPipeThroughStruct, PIPE_THROUGH_PRIVATE_CONTEXT, } from '../pipe-through-struct';
import { TraitPipeThroughGetPipe } from '../../traits/trait-pipe-through-get-pipe';
import { Impl } from '@lifaon/traits';
import { TGenericObservableLike } from '../../../observable/built-in/simple/simple-observable-types';
import { TGenericPipeLike } from '../../../pipe/pipe-types';

@Impl()
export class ImplTraitGetPipeForPipeThroughStruct<// generics
  GSelf extends IPipeThroughStruct<GPipe, TGenericObservableLike>,
  GPipe extends TGenericPipeLike,
  //
  > extends TraitPipeThroughGetPipe<GSelf, GPipe> {
  getPipe(this: GSelf): GPipe {
    return this[PIPE_THROUGH_PRIVATE_CONTEXT].pipe;
  }
}
