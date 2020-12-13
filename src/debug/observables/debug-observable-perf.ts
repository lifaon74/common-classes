import { FromIterableObservable } from '../../core/observables/built-in/observables/from-iterable-observable';
import { mapTransform } from '../../core/observables/built-in/transforms/map-transform';


export async function debugObservablePerf() {

  const range = (length: number): number[] => {
    return Array.from({ length }, (v: any, i: number) => i);
  };

  const testSimpleEmit = () => { // 328 -> 307ms
    let sum: number = 0;

    const sub = new FromIterableObservable(range(1e7))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    sub.activate();
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testMap = () => { // 729 -> 719 ms
    let sum: number = 0;

    const sub = new FromIterableObservable(range(1e7))
      .pipeThrough(mapTransform<number, number>(_ => (_ * 2)))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    sub.activate();
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testActivate = () => { // 2026 -> 2325 ms
    let sum: number = 0;
    const sub = new FromIterableObservable(range(1e2))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    for (let i = 0; i < 1e6; i++) {
      sub.activate().deactivate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testActivateWithPipe = () => { // 1067 -> 1044 ms
    let sum: number = 0;
    const sub = new FromIterableObservable<number>(range(1e2))
      .pipeThrough(mapTransform<number, number>(() => Math.random()))
      .pipeTo((value: number) => {
        sum += value;
      });

    console.time('perf');
    for (let i = 0; i < 1e5; i++) {
      sub.activate().deactivate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  const testConstruct = () => { // 1207 -> 2035 ms
    let sum: number = 0;
    const array = range(1e2);


    console.time('perf');
    for (let i = 0; i < 1e5; i++) {
      new FromIterableObservable(array)
        .pipeThrough(mapTransform<number, number>(() => Math.random()))
        .pipeTo((value: number) => {
          sum += value;
        })
        .activate();
    }
    console.timeEnd('perf');

    console.log('sum', sum);
  };

  testSimpleEmit();
  // testMap();
  // testActivate();
  // testActivateWithPipe();
  // testConstruct();
}
