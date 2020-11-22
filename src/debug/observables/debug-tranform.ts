import { TimerObservable } from '../../core/observables/built-in/observables/timer-observable';
import { mapTransform } from '../../core/observables/built-in/transforms/map-transform';
import { Observer } from '../../core/observables/core/observer/class/observer-class';


export async function debugTransform() {
  const transform = mapTransform<void, number>(() => Math.random());

  new TimerObservable(1000)
    .addObserver(transform.getObserver());

  transform.getObservable()
    .addObserver(new Observer<number>((value: number) => {
      console.log('value', value);
    }));
}

