import { EventListenerOnWithAsyncUnsubscribe, Trait, TraitEventListenerOn } from '@lifaon/traits';
import { TEventListenerOnUnsubscribeAsync } from '@lifaon/traits/src/build-in-traits/event-listener/trait-event-listener-on/event-listener-on-with-async-unsubscribe';
import { TAdvancedAbortSignalKeyValueTupleUnion } from '../../advanced-abort-signal-types';
import {
  TraitAdvancedAbortSignalWrapPromise, TTraitAdvancedAbortSignalWrapPromiseOnAborted,
  TTraitAdvancedAbortSignalWrapPromiseOnFulfilled, TTraitAdvancedAbortSignalWrapPromiseOnRejected
} from './trait-advanced-abort-signal-wrap-promise';
import { TraitAdvancedAbortSignalIsAborted } from '../trait-advanced-abort-signal-is-aborted';
import { TraitAdvancedAbortSignalGetReason } from '../trait-advanced-abort-signal-get-reason';
import { TraitEventListenerIsDispatching } from '@lifaon/traits/src/build-in-traits/event-listener/trait-event-listener-is-dispatching/trait-event-listener-is-dispatching';

export interface ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint extends TraitAdvancedAbortSignalGetReason<any>,
  TraitAdvancedAbortSignalIsAborted<any>,
  TraitEventListenerOn<any, TAdvancedAbortSignalKeyValueTupleUnion>,
  TraitEventListenerIsDispatching<any> {
}

@Trait()
export abstract class TraitAdvancedAbortSignalWrapPromiseUsingGetReasonAndIsAbortedAndOnAndIsDispatching<GSelf extends ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint>  extends TraitAdvancedAbortSignalWrapPromise<GSelf> {
  wrapPromise<GValue>(
    this: GSelf,
    promise: Promise<GValue>,
    onFulfilled: TTraitAdvancedAbortSignalWrapPromiseOnFulfilled<GValue>,
    onRejected: TTraitAdvancedAbortSignalWrapPromiseOnRejected,
    onAborted: TTraitAdvancedAbortSignalWrapPromiseOnAborted,
  ): void {
    if (this.isAborted()) {
      onAborted(this.getReason());
    } else {
      const unsubscribe: TEventListenerOnUnsubscribeAsync = EventListenerOnWithAsyncUnsubscribe<TAdvancedAbortSignalKeyValueTupleUnion, 'abort'>(
        this,
        'abort',
        () => {
          unsubscribe();
          onAborted(this.getReason());
        }
      );
      promise
        .then(
          (value: GValue) => {
            if (!this.isAborted()) {
              unsubscribe();
              onFulfilled(value);
            }
          },
          (error: any) => {
            if (!this.isAborted()) {
              unsubscribe();
              onRejected(error);
            }
          },
        );
    }
  }
}


