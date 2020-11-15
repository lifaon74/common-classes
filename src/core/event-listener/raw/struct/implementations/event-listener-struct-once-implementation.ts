import { Impl, TGenericKeyValueTupleUnion, TraitEventListenerOn, TraitEventListenerOnceUsingOn } from '@lifaon/traits';
import { IEventListenerStruct } from '../event-listener-struct';

export interface IImplTraitEventListenerOnForEventListenerStructGSelfConstraint<GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends IEventListenerStruct<GKeyValueTupleUnion>,
  TraitEventListenerOn<any, GKeyValueTupleUnion> {
}

@Impl()
export class ImplTraitEventListenerOnceForEventListenerStruct<GSelf extends IImplTraitEventListenerOnForEventListenerStructGSelfConstraint<GKeyValueTupleUnion>, GKeyValueTupleUnion extends TGenericKeyValueTupleUnion> extends TraitEventListenerOnceUsingOn<GSelf, GKeyValueTupleUnion> {
}
