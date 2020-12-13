import { TraitColorGetRed } from './red/trait-color-get-red';
import { TraitColorGetGreen } from './green/trait-color-get-green';
import { TraitColorGetBlue } from './blue/trait-color-get-blue';
import { TraitColorGetAlpha } from './alpha/trait-color-get-alpha';

export interface ITraitGetColors<GSelf> extends
  // traits
  TraitColorGetRed<GSelf>,
  TraitColorGetGreen<GSelf>,
  TraitColorGetBlue<GSelf>,
  TraitColorGetAlpha<GSelf>
  //
{
}
