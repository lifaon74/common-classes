import { TraitIsImplementedBy } from '@lifaon/traits';
import { TraitProgressGetLoaded } from './traits/trait-progress-get-loaded';
import { TraitProgressGetTotal } from './traits/trait-progress-get-total';
import { TraitProgressGetCode } from './traits/trait-progress-get-code';
import { TCode } from '../reason/reason-types';

export interface IProgressLike<GCode extends TCode> extends
  // traits
  TraitProgressGetCode<any, GCode>,
  TraitProgressGetLoaded<any>,
  TraitProgressGetTotal<any>
  //
{
}

export type TGenericProgressLike = IProgressLike<TCode>;


export function IsProgressLike<GCode extends TCode>(value: any): value is IProgressLike<GCode> {
  return TraitIsImplementedBy(TraitProgressGetCode, value)
    && TraitIsImplementedBy(TraitProgressGetLoaded, value)
    && TraitIsImplementedBy(TraitProgressGetTotal, value);
}

