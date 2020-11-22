// import { debugAdvancedAbortController } from './debug-advanced-abort-controller';
// import { debugEventListener } from './debug-event-listener';
import { debugObservables } from './observables/debug-observables';

export async function debug() {
  // await debugEventListener();
  // await debugAdvancedAbortController();
  await debugObservables();
}
