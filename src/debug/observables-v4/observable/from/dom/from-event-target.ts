import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { IObserver } from '../../../core/observer';
import { ITypedPureEventTarget } from '../../../../observables-v5/misc/event-listener/typed-event-target.type';
import { TKeyValueTuple } from '@lifaon/traits';
import { createEventListener } from '../../../../observables-v5/misc/event-listener/create-event-listener';

/**
 * Creates an Observable which emits events dispatched by 'target'
 */
export function fromEventTarget<GName extends string, GEvent extends Event>(
  target: ITypedPureEventTarget<TKeyValueTuple<GName, GEvent>>,
  eventName: GName,
  options?: AddEventListenerOptions,
): IObservable<GEvent> {
  return new Observable<GEvent>((observer: IObserver<GEvent>): IObservableUnsubscribeFunction => {
    return createEventListener<GName, GEvent>(target, eventName, (event: GEvent): void => {
      observer.emit(event);
    }, options);
  });
}


// export function fromEventTarget<GTarget extends IGenericTypedPureEventTarget, GName extends TInferKeyValueTupleUnionGKey<TInferTypedPureEventTargetGKeyValueTupleUnion<GTarget>>>(
//   target: GTarget,
//   eventName: GName,
//   options?: AddEventListenerOptions,
// ): IObservable<TInferKeyValueTupleUnionGValueFromKey<TInferTypedPureEventTargetGKeyValueTupleUnion<GTarget>, GName>> {
//   type GEvent = TInferKeyValueTupleUnionGValueFromKey<TInferTypedPureEventTargetGKeyValueTupleUnion<GTarget>, GName>;
//   return new Observable<GEvent>((observer: IObserver<GEvent>): IObservableUnsubscribeFunction => {
//     return addEventListener<GName, GEvent>(target, eventName, (event: GEvent): void => {
//       observer.emit(event);
//     }, options);
//   });
// }

