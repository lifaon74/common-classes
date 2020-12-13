import {
  TGenericStringKeyValueTupleUnion, TInferNotificationsObserversFromKeyValueTupleUnion
} from '../notifications-observable-types';
import { TInferKeyValueTupleUnionGKey } from '@lifaon/traits';
import { IEventListenerStruct } from '../../../../../event-listener/raw/struct/event-listener-struct';
import { TObservableKeyValueTupleUnion } from '../../../../core/observable/built-in/simple/simple-observable-types';


/** PRIVATE CONTEXT **/

export const NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT: unique symbol = Symbol('notification-observable-private-context');

export interface INotificationsObservablePrivateContext<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> {
  // map from a name to a list of notifications observers
  readonly observersMap: Map<TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>[]>;
}

/** STRUCT DEFINITION **/

export interface INotificationsObservableStruct<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> extends IEventListenerStruct<TObservableKeyValueTupleUnion<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>> {
  readonly [NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT]: INotificationsObservablePrivateContext<GKeyValueTupleUnion>;
}

export type TGenericNotificationsObservableStruct = INotificationsObservableStruct<TGenericStringKeyValueTupleUnion>;
