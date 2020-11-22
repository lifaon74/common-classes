import { TraitActivate, TraitDeactivate, TraitIsActivated, TraitIsImplementedBy, TraitToggle } from '@lifaon/traits';

export interface IActivableLike<GReturn> extends
  // traits
  TraitIsActivated<any>,
  TraitActivate<any, GReturn>,
  TraitDeactivate<any, GReturn>,
  TraitToggle<any, GReturn>
  //
{
}

export function IsActivableLike<GReturn>(value: any): value is IActivableLike<GReturn> {
  return TraitIsImplementedBy(TraitIsActivated, value)
    && TraitIsImplementedBy(TraitActivate, value)
    && TraitIsImplementedBy(TraitDeactivate, value)
    && TraitIsImplementedBy(TraitToggle, value);
}

/** TYPES **/

export type TActivableActivateFunction<GReturn> = () => GReturn;

export type TActivableDeactivateFunction<GReturn> = () => GReturn;
