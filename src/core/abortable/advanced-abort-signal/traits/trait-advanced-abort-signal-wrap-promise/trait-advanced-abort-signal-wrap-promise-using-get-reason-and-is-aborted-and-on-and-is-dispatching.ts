import {
  EventListenerAwaitUntilNotDispatching,
  EventListenerOnceQueued, TEventListenerOnUnsubscribe,
  Trait, TraitEventListenerIsDispatching,
  TraitEventListenerOn
} from '@lifaon/traits';
import { TAdvancedAbortSignalKeyValueTupleUnion } from '../../advanced-abort-signal-types';
import {
  TraitAdvancedAbortSignalWrapPromise, TTraitAdvancedAbortSignalWrapPromiseOnAborted,
  TTraitAdvancedAbortSignalWrapPromiseOnFulfilled, TTraitAdvancedAbortSignalWrapPromiseOnRejected
} from './trait-advanced-abort-signal-wrap-promise';
import { TraitAdvancedAbortSignalIsAborted } from '../trait-advanced-abort-signal-is-aborted';
import { TraitAdvancedAbortSignalGetReason } from '../trait-advanced-abort-signal-get-reason';

export interface ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint extends TraitAdvancedAbortSignalGetReason<any>,
  TraitAdvancedAbortSignalIsAborted<any>,
  TraitEventListenerOn<any, TAdvancedAbortSignalKeyValueTupleUnion>,
  TraitEventListenerIsDispatching<any> {
}

@Trait()
export abstract class TraitAdvancedAbortSignalWrapPromiseUsingGetReasonAndIsAbortedAndOnAndIsDispatching<GSelf extends ITraitAdvancedAbortSignalWrapPromiseUsingAndIsAbortedAndOnAndIsDispatchingGSelfConstraint> extends TraitAdvancedAbortSignalWrapPromise<GSelf> {
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
      let done: boolean = false;

      const clear = () => {
        done = true;
        EventListenerAwaitUntilNotDispatching(this, unsubscribe);
      };

      const unsubscribe: TEventListenerOnUnsubscribe = this.on('abort', () => {
        if (!done) {
          clear();
          onAborted(this.getReason());
        }
      });

      promise
        .then(
          (value: GValue) => {
            if (!done) {
              clear();
              onFulfilled(value);
            }
          },
          (error: any) => {
            if (!done) {
              clear();
              onRejected(error);
            }
          },
        );
    }
  }
}


