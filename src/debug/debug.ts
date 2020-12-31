// import { debugAdvancedAbortController } from './debug-advanced-abort-controller';
// import { debugEventListener } from './debug-event-listener';
// import { debugObservables } from './observables/debug-observables';
// import { debugColor } from './color/debug-color';
import { debugObservableV4 } from './observables-v4/debug-observables-v4';
import { debugObservableV5 } from './observables-v5/debug-observables-v5';

export async function debug() {
  // await debugEventListener();
  // await debugAdvancedAbortController();
  // await debugObservables();
  // await debugColor();
  // await debugObservableV4();
  await debugObservableV5();
}
