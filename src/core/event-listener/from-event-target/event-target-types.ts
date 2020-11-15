import { TInferKeyValueTupleUnionGKey, TInferKeyValueTupleUnionGValueFromKey, TKeyValueTuple } from '@lifaon/traits';


export type TGenericEventKeyValueTuple = TKeyValueTuple<string, Event>;

export type TGenericEventKeyValueTupleUnion = TGenericEventKeyValueTuple;

export type TTypedEventListener<GValue extends Event> = (value: GValue) => void;

export interface ITypedEventListenerObject<GValue extends Event> {
  handleEvent(value: GValue): void;
}

export type TTypedEventListenerOrEventListenerObject<GValue extends Event> =
  TTypedEventListener<GValue>
  | ITypedEventListenerObject<GValue>;

export interface ITypedEventTarget<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends EventTarget {
  addEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    type: GKey,
    listener: TTypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<GKey extends TInferKeyValueTupleUnionGKey<GKeyValueTupleUnion>>(
    type: GKey,
    listener: TTypedEventListenerOrEventListenerObject<TInferKeyValueTupleUnionGValueFromKey<GKeyValueTupleUnion, GKey>> | null,
    options?: boolean | AddEventListenerOptions
  ): void;

  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;

  dispatchEvent(event: Event): boolean;
}
