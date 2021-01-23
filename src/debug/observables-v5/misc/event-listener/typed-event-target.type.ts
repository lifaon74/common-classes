import type { TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey, TKeyValueTuple } from '@lifaon/traits';
import {
  IEventTargetToEventMapUnion, IGenericEventTargetToEventMap, TInferEventTargetEventMap
} from './event-target-to-event-map.type';
import { IPureEventTarget } from './pure-event-target.type';


export type IGenericEventKeyValueTuple = TKeyValueTuple<string, Event>;

export type IGenericEventKeyValueTupleUnion = IGenericEventKeyValueTuple;

export type IEventKeyValueMapToKeyValueTupleUnion<GEventMap extends object> = {
  [GKey in Extract<keyof GEventMap, string>]: GEventMap[GKey] extends Event
    ? TKeyValueTuple<GKey, GEventMap[GKey]>
    : never;
}[Extract<keyof GEventMap, string>];


export type IPureEventTargetToTypedPureEventTarget<GEventTarget extends IPureEventTarget, GEventMap extends IGenericEventTargetToEventMap = IEventTargetToEventMapUnion>
  = ITypedPureEventTarget<IEventKeyValueMapToKeyValueTupleUnion<TInferEventTargetEventMap<GEventTarget, GEventMap>>>

export type IEventTargetToTypedEventTarget<GEventTarget extends EventTarget, GEventMap extends IGenericEventTargetToEventMap = IEventTargetToEventMapUnion>
  = ITypedEventTarget<IEventKeyValueMapToKeyValueTupleUnion<TInferEventTargetEventMap<GEventTarget, GEventMap>>>


/*--*/


export interface ITypedEventListener<GValue extends Event> {
  (value: GValue): void;
}

export interface ITypedEventListenerObject<GValue extends Event> {
  handleEvent(value: GValue): void;
}

export type ITypedEventListenerOrEventListenerObject<GValue extends Event> =
  ITypedEventListener<GValue>
  | ITypedEventListenerObject<GValue>;

/*--*/

export interface ITypedPureEventTarget<GKeyValueTupleUnion extends IGenericEventKeyValueTupleUnion> extends IPureEventTarget {
  addEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    type: GKey,
    listener: ITypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    type: GKey,
    listener: ITypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
    options?: boolean | AddEventListenerOptions
  ): void;
}

// export interface ITypedPureEventTarget<GKeyValueTupleUnion extends IGenericEventKeyValueTupleUnion> extends IPureEventTarget {
//   addEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
//     type: GKey,
//     listener: ITypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
//     options?: boolean | AddEventListenerOptions
//   ): void;
//
//   addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
//
//   removeEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
//     type: GKey,
//     listener: ITypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
//     options?: boolean | AddEventListenerOptions
//   ): void;
//
//   removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
//
// }

export interface ITypedEventTarget<GKeyValueTupleUnion extends IGenericEventKeyValueTupleUnion> extends ITypedPureEventTarget<GKeyValueTupleUnion> {
  dispatchEvent(event: Event): boolean;
}


export type IGenericTypedPureEventTarget = ITypedPureEventTarget<IGenericEventKeyValueTupleUnion>;

export type TInferTypedPureEventTargetGKeyValueTupleUnion<GTypedPureEventTarget extends IGenericTypedPureEventTarget> =
  GTypedPureEventTarget extends ITypedPureEventTarget<infer GKeyValueTupleUnion>
    ? GKeyValueTupleUnion
    : never;

