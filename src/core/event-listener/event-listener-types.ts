import {
  TGenericKeyValueTupleUnion, TraitEventListenerDispatch, TraitEventListenerIsDispatching, TraitEventListenerOn,
  TraitIsImplementedBy
} from '@lifaon/traits';

export interface IEventListenerLike<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends
  // traits
  TraitEventListenerDispatch<any, GKeyValueTupleUnion>,
  TraitEventListenerIsDispatching<any>,
  TraitEventListenerOn<any, GKeyValueTupleUnion>
  //
{
}

export function IsEventListenerLike<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion>(value: any): value is IEventListenerLike<GKeyValueTupleUnion> {
  return TraitIsImplementedBy(TraitEventListenerDispatch, value)
    && TraitIsImplementedBy(TraitEventListenerIsDispatching, value)
    && TraitIsImplementedBy(TraitEventListenerOn, value);
}

/** TYPES **/

export interface IEventLike extends Pick<Event, 'type'> {
}

export type TGenericEventLike = IEventLike;
