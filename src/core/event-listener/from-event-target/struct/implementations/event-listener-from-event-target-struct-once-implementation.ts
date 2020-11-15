import {
  Impl, TraitEventListenerOn, TraitEventListenerOnceUsingOn
} from '@lifaon/traits';
import { IEventListenerFromEventTargetStruct } from '../event-listener-from-event-target-struct';
import { TGenericEventKeyValueTupleUnion } from '../../event-target-types';

export interface ImplTraitEventListenerOnForEventListenerFromEventTargetStructGSelfConstraint<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends IEventListenerFromEventTargetStruct<GKeyValueTupleUnion>,
  TraitEventListenerOn<any, GKeyValueTupleUnion> {
}

@Impl()
export class ImplTraitEventListenerOnceForEventListenerFromEventTargetStruct<GSelf extends ImplTraitEventListenerOnForEventListenerFromEventTargetStructGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends TraitEventListenerOnceUsingOn<GSelf, GKeyValueTupleUnion> {
}
