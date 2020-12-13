import { TimerObservable } from '../../core/observables/built-in/observables/timer-observable';
import { Observer } from '../../core/observables/core/observer/built-in/default/class/observer-class';


export async function debugObservableAndObserverLink() {
  const observable = new TimerObservable(1000);

  const observer = new Observer<void>(() => {
    console.log('tick');
  });

  observable.addObserver(observer);

  setTimeout(() => {
    observable.removeObserver(observer);
  }, 2000);
}

