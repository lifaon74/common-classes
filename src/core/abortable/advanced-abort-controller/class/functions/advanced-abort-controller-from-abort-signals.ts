import { TAbortSignalLike, TAbortSignalLikeOrUndefined } from '../../advanced-abort-controller-types';
import { AdvancedAbortController } from '../advanced-abort-controller-class';
import { IsAbortSignal } from '../../../functions/is-abort-signal';
import {
  IAdvancedAbortSignalLike, IsAdvancedAbortSignalLike, TAdvancedAbortSignalKeyValueTupleUnion
} from '../../../advanced-abort-signal/advanced-abort-signal-types';
import { AbortReason } from '../../../../reason/class/built-in/abort-reason';
import { EventListener } from '../../../../event-listener/raw/class/event-listener-class';
import { TKeyValueMapToKeyValueTupleUnion } from '@lifaon/traits';
import { EventListenerFromEventTarget } from '../../../../event-listener/from-event-target/class/event-listener-from-event-target-class';
import { IEventListenerLike } from '../../../../event-listener/event-listener-types';

export function AdvancedAbortControllerFromAbortSignals(
  signals: TAbortSignalLikeOrUndefined[]
): AdvancedAbortController {
  // throw 'TODO'; // TODO
  const advancedAbortController: AdvancedAbortController = new AdvancedAbortController();

  const _signals: TAbortSignalLike[] = signals
    .filter((signal: TAbortSignalLikeOrUndefined, index: number): signal is TAbortSignalLike => {
      if (signal === void 0) {
        return false;
      } else if (IsAbortSignal(signal) || IsAdvancedAbortSignalLike(signal)) {
        return true;
      } else {
        throw new TypeError(`Expected AbortSignal, AdvancedAbortSignal or undefined at arguments #${ index } of AdvancedAbortController.fromAbortSignals`);
      }
    });

  const abort = (signal: (AbortSignal | IAdvancedAbortSignalLike)): void => {
    advancedAbortController.abort(
      IsAbortSignal(signal)
        ? new AbortReason(`AbortSignal aborted`)
        : signal.getReason()
    );
  };

  for (let i = 0, l = _signals.length; i < l; i++) {
    const signal: TAbortSignalLikeOrUndefined = _signals[i];
    if (IsAbortSignal(signal) ? signal.aborted : signal.isAborted()) {
      abort(signal);
      return advancedAbortController;
    }
  }

  /* no signal aborted yet */

  // TODO continue here
  const signalObservers: TSignalObserver[] = _signals.map((signal: TAbortSignalLike) => {
    const eventListener: IAdvancedAbortSignalLike = (
      IsAbortSignal(signal)
        ? new EventListenerFromEventTarget<TAdvancedAbortSignalKeyValueTupleUnion>(signal)
        : signal
    );
    return observable.addListener('abort', () => {
      clear();
      abort(signal);
    });
  });


  const clear = () => {
    for (let i = 0, l = signalObservers.length; i < l; i++) {
      signalObservers[i].deactivate();
    }
    signalListener.deactivate();
  };

  // in the case of our instance.signal is aborted, it's no more required to listen to 'abort' from input 'signal'
  const signalListener: INotificationsObserver<'abort', any> = advancedAbortController.signal.addListener('abort', clear);

  // activate all
  for (let i = 0, l = signalObservers.length; i < l; i++) {
    signalObservers[i].activate();
  }
  signalListener.activate();


  // type TSignalObserver = INotificationsObserver<'abort', void>;
  // type TSignalObservable = IBaseNotificationsObservable<'abort', void>;
  //
  // const signalObservers: TSignalObserver[] = _signals.map((signal: TAbortSignalLike) => {
  //   const observable: TSignalObservable = (
  //     IsAbortSignal(signal)
  //       ? new EventsObservable<AbortSignalEventMap>(signal)
  //       : signal
  //   ) as TSignalObservable;
  //   return observable.addListener('abort', () => {
  //     clear();
  //     abort(signal);
  //   });
  // });
  //
  //
  // const clear = () => {
  //   for (let i = 0, l = signalObservers.length; i < l; i++) {
  //     signalObservers[i].deactivate();
  //   }
  //   signalListener.deactivate();
  // };
  //
  // // in the case of our instance.signal is aborted, it's no more required to listen to 'abort' from input 'signal'
  // const signalListener: INotificationsObserver<'abort', any> = instance.signal.addListener('abort', clear);
  //
  // // activate all
  // for (let i = 0, l = signalObservers.length; i < l; i++) {
  //   signalObservers[i].activate();
  // }
  // signalListener.activate();

  return advancedAbortController;
}

