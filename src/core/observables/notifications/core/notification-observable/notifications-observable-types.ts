import { INotificationsObserverLike } from '../notifications-observer/notifications-observer-types';
import { TraitNotificationsObservableAddObserver } from './traits/trait-notifications-observable-add-observer';
import {
  TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey, TKeyValueTuple, TraitIsImplementedBy
} from '@lifaon/traits';
import { ISimpleObservableLike, IsObservableLike } from '../../../core/observable/built-in/simple/simple-observable-types';
import { INotificationsObservable } from './class/notifications-observable-class';
import { INotificationLike } from '../../../../notification/notification-types';
import { TraitObservableRemoveObserver } from '../../../core/observable/traits/trait-observable-remove-observer';

export interface INotificationsObservableLike<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> extends
  // observable traits
  ISimpleObservableLike<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>,
  // own traits
  TraitNotificationsObservableAddObserver<any, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>,
  TraitObservableRemoveObserver<any, TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>
  //
{
}

export type TGenericNotificationsObservableLike = INotificationsObservableLike<any>;

// export type TInferNotificationsObservableLikeGKeyValueTupleUnion<GNotificationsObservableLike extends TGenericNotificationsObservableLike> =
//   GNotificationsObservableLike extends INotificationsObservableLike<infer GKeyValueTupleUnion>
//     ? GKeyValueTupleUnion
//     : never;

export function IsNotificationsObservableLike<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion>(value: any): value is INotificationsObservableLike<GKeyValueTupleUnion> {
  return IsObservableLike(value)
    && TraitIsImplementedBy(TraitNotificationsObservableAddObserver, value)
    && TraitIsImplementedBy(TraitObservableRemoveObserver, value);
}

/** TYPES **/

export type TGenericStringKeyValueTuple = TKeyValueTuple<string, any>;
export type TGenericStringKeyValueTupleUnion = TGenericStringKeyValueTuple;

// export type TInferNotificationsFromEventMap<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> = {
//   [GKey in keyof TGenericStringKeyValueTupleUnion]: GKey extends string
//     ? INotificationLike<GKey, TGenericStringKeyValueTupleUnion[GKey]>
//     : never;
// }[keyof TGenericStringKeyValueTupleUnion];

export type TInferNotificationsFromKeyValueTupleUnion<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> =
  GKeyValueTupleUnion extends TKeyValueTuple<infer GKey, infer GValue>
    ? (
      GKey extends string
        ? INotificationLike<GKey, GValue>
        : never
      )
    : never;


export type TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> =
  GKeyValueTupleUnion extends TKeyValueTuple<infer GKey, infer GValue>
    ? (
      GKey extends string
        ? INotificationsObserverLike<GKey, GValue>
        : never
      )
    : never;

// const a: TInferNotificationsObserversFromKeyValueTupleUnion<TObservableKeyValueTupleUnion<TGenericObserverLike>>;

// export type TNotificationsObservableCreateFunction<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> = TObservableCreateFunction<TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>>;

// export type TNotificationsObservableEmitFunction<GNotifications extends TGenericNotificationLike> = (notification: GNotifications) => void;
//
// export type TInferNotificationsObservableEmitFunctionFromKeyValueTupleUnion<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> = TNotificationsObservableEmitFunction<TInferNotificationsFromKeyValueTupleUnion<GKeyValueTupleUnion>>;
//
// export type TNotificationsObservableCreateFunction<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> = (emit: TInferNotificationsObservableEmitFunctionFromKeyValueTupleUnion<GKeyValueTupleUnion>, observable: INotificationsObservable<GKeyValueTupleUnion>) => void;


export type TNotificationsObservableEmitFunction<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> =
  <GName extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(name: GName, value: TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GName>) => void;

export type TNotificationsObservableCreateFunction<GKeyValueTupleUnion extends TGenericStringKeyValueTupleUnion> = (emit: TNotificationsObservableEmitFunction<GKeyValueTupleUnion>, observable: INotificationsObservable<GKeyValueTupleUnion>) => void;

