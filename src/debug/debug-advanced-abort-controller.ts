import { AdvancedAbortController } from '../core/abortable/advanced-abort-controller/class/advanced-abort-controller-class';
import { TGenericAdvancedAbortControllerLike } from '../core/abortable/advanced-abort-controller/advanced-abort-controller-types';
import {
  TTraitAdvancedAbortSignalWrapPromiseOnAborted,
  TTraitAdvancedAbortSignalWrapPromiseOnFulfilled, TTraitAdvancedAbortSignalWrapPromiseOnRejected
} from '../core/abortable/advanced-abort-signal/traits/trait-advanced-abort-signal-wrap-promise/trait-advanced-abort-signal-wrap-promise';
import { Reason } from '../core/reason/class/reason-class';
import { TraitIsImplementedBy } from '@lifaon/traits';
import { TraitReasonGetStack } from '../core/reason/traits/trait-reason-get-stack';
import { noopOnAborted } from '../core/abortable/advanced-abort-signal/traits/trait-advanced-abort-signal-wrap-function/function/noop-on-aborted';
import { throwOnAborted } from '../core/abortable/advanced-abort-signal/traits/trait-advanced-abort-signal-wrap-function/function/throw-on-aborted';



// https://github.com/lifaon74/observables/blob/master/src/misc/advanced-abort-controller/advanced-abort-signal/types.ts
// https://github.com/lifaon74/observables/blob/master/src/misc/advanced-abort-controller/advanced-abort-signal/implementation.ts
// https://github.com/lifaon74/observables/blob/master/src/misc/advanced-abort-controller/implementation.ts

export function debugAdvancedAbortController1() {
  const controller = new AdvancedAbortController();
  const signal = controller.getSignal();

  const writePromiseState = <T>(name: string, promise: Promise<T>): void => {
    const timer = setTimeout(() => {
      console.log('[TIMEOUT]', name);
    }, 1000);
    promise
      .finally(() => {
        clearTimeout(timer);
      })
      .then(
        (value: T) => {
          console.log('[FULFILL]', name, value);
        },
        (error: any) => {
          console.log('[ERROR]', name, error);
        },
      );
  };

  const logPromise = <GValue>(name: string): [TTraitAdvancedAbortSignalWrapPromiseOnFulfilled<GValue>, TTraitAdvancedAbortSignalWrapPromiseOnRejected, TTraitAdvancedAbortSignalWrapPromiseOnAborted,]  => {
    return [
      (value: GValue) => {
        console.log('[FULFILL]', name, value);
      },
      (error: any) => {
        console.log('[REJECT]', name, error);
      },
      (reason: any) => {
        console.log('[ABORT]', name, reason);
        if (TraitIsImplementedBy(TraitReasonGetStack, reason)) {
          console.log(reason.getStack());
        }
      },
    ];
  }


  // signal
  //   .on('abort', (reason: any) => {
  //     console.log('aborted !', reason);
  //   });
  //
  // const p0 = fetch('https://www.w3.org/TR/PNG/iso_8859-1.txt', { mode: 'no-cors', signal: signal.toAbortController().signal })
  //   .then((response: Response) => {
  //     console.log(response);
  //   })

  // const p0 = Promise.resolve<string>('a');

  const p0 = fetch(...signal.wrapFetchArguments('https://www.w3.org/TR/PNG/iso_8859-1.txt'))
    .then((response: Response) => {
      console.log(response);
    })

  signal.wrapPromise(p0, ...logPromise('p0'));

  const fnc = signal.wrapFunction((value: string) => {
    console.log('value', value);
  }, noopOnAborted);

  fnc('hello 1');

  controller.abort(new Reason('manual abort'));

  fnc('hello 2');
}


// export function testAbortController2() {
//   const abortController = new AbortController();
//   const controller = AdvancedAbortController.fromAbortSignals(abortController.signal);
//
//   controller.signal.on('abort', (reason: any) => {
//     console.log('aborted !', reason);
//   });
//
//   abortController.abort();
// }


// export function advancedAbortSignalExample(signal: IAdvancedAbortSignal = new AdvancedAbortController().signal): Promise<void> {
//   // 1) wrapFetchArguments => ensures fetch will be aborted when signal is aborted
//   // 2) wrapPromise => ensures fetch won't resolve if signal is aborted
//   return signal.wrapPromise(fetch(...signal.wrapFetchArguments('http://domain.com/request1')))
//     .then(signal.wrapFunction(function toJSON(response: Response) { // 3) ensures 'toJSON' is called only if signal is not aborted
//       return response.json(); // 'wrapPromise' not required because we immediately return a promise inside 'wrapFunction'
//     }))
//     .then(signal.wrapFunction(function next(json: any) { // 4) ensures 'next' is called only if signal is not aborted
//       console.log(json);
//       // continue...
//     }));
// }


export async function debugAdvancedAbortController() {
  await debugAdvancedAbortController1();
}

