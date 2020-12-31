import { TAbortSignalLike, TAbortSignalLikeOrUndefined } from '../../advanced-abort-controller-types';
import { AdvancedAbortController } from '../advanced-abort-controller-class';
import { isAbortSignal } from '../../../../../debug/observables-v5/misc/abortable/is-abort-signal';
import {
  IAdvancedAbortSignalLike, IsAdvancedAbortSignalLike, TAdvancedAbortSignalKeyValueTupleUnion
} from '../../../advanced-abort-signal/advanced-abort-signal-types';
import { AbortReason } from '../../../../reason/class/built-in/abort-reason';
import {
  EventListenerOnWithAsyncUnsubscribe, TraitEventListenerIsDispatching, TraitEventListenerOn, TEventListenerOnUnsubscribeAsync
} from '@lifaon/traits';
import { EventListenerFromEventTarget } from '../../../../event-listener/from-event-target/class/event-listener-from-event-target-class';

export function AdvancedAbortControllerFromAbortSignals(
  signals: TAbortSignalLikeOrUndefined[]
): AdvancedAbortController {
  const advancedAbortController: AdvancedAbortController = new AdvancedAbortController();

  const _signals: TAbortSignalLike[] = signals
    .filter((signal: TAbortSignalLikeOrUndefined, index: number): signal is TAbortSignalLike => {
      if (signal === void 0) {
        return false;
      } else if (isAbortSignal(signal) || IsAdvancedAbortSignalLike(signal)) {
        return true;
      } else {
        throw new TypeError(`Expected AbortSignal, AdvancedAbortSignal or undefined at arguments #${ index } of AdvancedAbortController.fromAbortSignals`);
      }
    });

  const abort = (signal: (AbortSignal | IAdvancedAbortSignalLike)): void => {
    advancedAbortController.abort(
      isAbortSignal(signal)
        ? new AbortReason(`AbortSignal aborted`)
        : signal.getReason()
    );
  };

  for (let i = 0, l = _signals.length; i < l; i++) {
    const signal: TAbortSignalLikeOrUndefined = _signals[i];
    if (isAbortSignal(signal) ? signal.aborted : signal.isAborted()) {
      abort(signal);
      return advancedAbortController;
    }
  }

  /* no signal aborted yet */

  const clear = () => {
    for (let i = 0, l = unsubscribeSignalList.length; i < l; i++) {
      unsubscribeSignalList[i]();
    }
    unsubscribeOwnSignal();
  };

  // in the case of our instance.signal is aborted, it's no more required to listen to 'abort' from input 'signal'
  const unsubscribeOwnSignal: TEventListenerOnUnsubscribeAsync = EventListenerOnWithAsyncUnsubscribe<TAdvancedAbortSignalKeyValueTupleUnion, 'abort'>(
    advancedAbortController.getSignal(),
    'abort',
    clear
  );

  const unsubscribeSignalList: TEventListenerOnUnsubscribeAsync[] = _signals.map((signal: TAbortSignalLike) => {
    interface TEventListener extends TraitEventListenerOn<any, TAdvancedAbortSignalKeyValueTupleUnion>, TraitEventListenerIsDispatching<any> {
    }

    const eventListener: TEventListener = (
      isAbortSignal(signal)
        ? new EventListenerFromEventTarget<TAdvancedAbortSignalKeyValueTupleUnion>(signal)
        : signal
    );

    return EventListenerOnWithAsyncUnsubscribe<TAdvancedAbortSignalKeyValueTupleUnion, 'abort'>(
      eventListener,
      'abort',
      () => {
        clear();
        abort(signal);
      }
    );
  });


  return advancedAbortController;
}

