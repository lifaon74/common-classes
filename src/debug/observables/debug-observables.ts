import {
  CreateSimpleTransform, TCreateSimpleTransformOutValueFunction,
} from '../../core/observables/core/transform/class/functions/create-simple-transform';
import { debugObservablePerf } from './debug-observable-perf';
import { debugObservableAndObserverLink } from './debug-observable-and-observer-link';

// https://github.com/lifaon74/observables/blob/dev-3.0-ts-4.0-support/src/core/observable/interfaces.ts
// https://github.com/lifaon74/observables/tree/dev-3.0-ts-4.0-support/src/core/observable
// https://github.com/lifaon74/observables/blob/dev-3.0-ts-4.0-support/src/core/observer/implementation.ts


/*
OBSERVABLE           OBSERVER             OBSERVABLE
    ↓                ↑      ↓                 ↑
    -----> PIPE >-----      ---> TRANSFORM >---
    ↓                                ↑
    --------> PIPE THROUGH >----------
 */


function filterTransform<GValueIn, GValueOut extends GValueIn>(filterFunction: (value: GValueIn) => value is GValueOut) {
  return CreateSimpleTransform<GValueIn, GValueOut>((value: GValueIn, emit: TCreateSimpleTransformOutValueFunction<GValueOut>) => {
    if (filterFunction(value)) {
      emit(value);
    }
  });
}


export async function debugObservables() {
  await debugObservableAndObserverLink();
  // await debugPipe();
  // await debugTransform();
  // await debugPipeThrough();
  // await debugNotificationObservable();
  // await debugObservablePerf();
}

