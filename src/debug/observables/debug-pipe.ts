import { TimerObservable } from '../../core/observables/built-in/observables/timer-observable';


export async function debugPipe() {
  const pipe = new TimerObservable(1000)
    .pipeTo(() => {
      console.log('tick');
    })
    .activate();

  setTimeout(() => {
    pipe.deactivate();
  }, 2000);
}

