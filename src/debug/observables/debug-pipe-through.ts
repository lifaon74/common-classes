import { TimerObservable } from '../../core/observables/built-in/observables/timer-observable';
import { mapTransform } from '../../core/observables/built-in/transforms/map-transform';
import { PipeThrough } from '../../core/observables/core/pipe-through/class/pipe-through-class';

export async function debugPipeThrough1() {
  const observable = new TimerObservable(1000);
  const transform = mapTransform<void, number>(() => Math.random());
  const pipe = observable.pipeTo(transform.getObserver());
  const pipeThrough = new PipeThrough(pipe, transform.getObservable()).activate();

  const pipe2 = transform
    .getObservable()
    .pipeTo((value: number) => {
      console.log('tick', value);
    })
    .activate();

  setTimeout(() => {
    pipe2.deactivate();
  }, 2000);
}

export async function debugPipeThrough2() {
  const pipe = new TimerObservable(1000)
    .pipeThrough(mapTransform<void, number>(() => Math.random()))
    .pipeTo((value: number) => {
      console.log('tick', value);
    })
    .activate();

  setTimeout(() => {
    pipe.deactivate();
  }, 2000);
}

export async function debugPipeThrough3() {

  const pipe = new TimerObservable(1000)
    .pipeThroughSoft(mapTransform<void, number>(() => Math.random()))
    .activate()
    .getObservable()
    .pipeTo((value: number) => {
      console.log('tick', value);
    })
    .activate();

  setTimeout(() => {
    pipe.deactivate();
  }, 2000);
}

export async function debugPipeThrough() {
  // await debugPipeThrough1();
  await debugPipeThrough2();
  // await debugPipeThrough3();
}

