import { IEmitFunction, IOperatorFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { shareOperator } from '../share';
import { pipeOperatorFunctions } from '../../misc/helpers/pipe-operator-functions';
import { createFastArrayIterator, IFastArrayIterator } from '../../misc/fast-array-iterator/fast-array-iterator';


export function replayOperator<GValue>(
  length: number = Number.POSITIVE_INFINITY,
): IOperatorFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    const iterator: IFastArrayIterator<GValue> = createFastArrayIterator<GValue>();

    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let running: boolean = true;

      iterator.iterate((value: GValue): boolean => {
        if (running) {
          emit(value);
        }
        return running;
      });

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        iterator.mutate((array: GValue[]): void => {
          if (array.length === length) {
            array.shift();
          }
          array.push(value);
        });
        emit(value);
      });

      return (): void => {
        running = false;
        unsubscribe();
      };
    };
  };
}

// export function replayOperator<GValue>(
//   length: number = Number.POSITIVE_INFINITY,
// ): IOperatorFunction<GValue, GValue> {
//   return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
//     let _values: GValue[] = [];
//     let _isDispatching = false;
//
//     const _cloneValuesIfDispatching = (): void => {
//       if (_isDispatching) {
//         _values = _values.slice();
//       }
//     };
//
//     return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//       let running: boolean = false;
//
//       const values: GValue[] = _values;
//       const lengthMinusOne: number = values.length - 1;
//       if (lengthMinusOne >= 0) {
//         _isDispatching = true;
//         for (let i = 0; (i < lengthMinusOne) && running; i++) {
//           emit(values[i]);
//         }
//         _isDispatching = false;
//         if (running) {
//           emit(values[lengthMinusOne]);
//         }
//       }
//
//       const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
//         _cloneValuesIfDispatching();
//         if (_values.length === length) {
//           _values.shift();
//         }
//         _values.push(value);
//         console.log('store', _values);
//         emit(value);
//       });
//
//       return (): void => {
//         running = false;
//         unsubscribe();
//       };
//     };
//   };
// }

export function replaySharedOperator<GValue>(
  length?: number,
): IOperatorFunction<GValue, GValue> {
  return pipeOperatorFunctions([
    shareOperator<GValue>({ disableDuplicateSubscribeVerification: true }),
    replayOperator<GValue>(length),
  ]);
}

// https://indepth.dev/posts/1248/fastest-way-to-cache-for-lazy-developers-angular-with-rxjs


