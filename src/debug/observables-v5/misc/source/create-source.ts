import { IEmitFunction, ISubscribeFunction, IUnsubscribeFunction } from '../../types';
import { ISource } from './source-interface';
import { createFastArrayIterator, IFastArrayIterator } from '../fast-array-iterator/fast-array-iterator';
import { noop } from '../helpers/noop';

export interface ICreateSourceOptions {
  disableDuplicateSubscribeVerification?: boolean;
}


export function createSourceUsingFastArrayIterator<GValue>(
  options: ICreateSourceOptions = {},
): ISource<GValue> {
  const iterator: IFastArrayIterator<IEmitFunction<GValue>> = createFastArrayIterator<IEmitFunction<GValue>>();

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    iterator.mutate((array: IEmitFunction<GValue>[]): void => {
      array.push(emit);
    });
    return () => {
      if (running) {
        running = false;
        const array: IEmitFunction<GValue>[] = iterator.getArray() as IEmitFunction<GValue>[];
        const index: number = array.indexOf(emit);
        array[index] = noop;
        iterator.mutate((array: IEmitFunction<GValue>[]): void => {
          array.splice(index, 1);
        });
      }
    };
  };

  return Object.freeze({
    getObservers(): readonly IEmitFunction<GValue>[] {
      return iterator.getArray();
    },
    emit: (value: GValue): void => {
      iterator.iterate((emit: IEmitFunction<GValue>): boolean => {
        emit(value);
        return true;
      });
    },
    subscribe: (
      options.disableDuplicateSubscribeVerification
        ? subscribe
        : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
          if (iterator.getArray().includes(emit)) {
            throw new Error(`Already subscribed to this Source`);
          } else {
          }
          return subscribe(emit);
        }
    ),
  });
}

export function createSource<GValue>(
  options: ICreateSourceOptions = {},
): ISource<GValue> {
  let _emitFunctions: IEmitFunction<GValue>[] = [];
  let _isDispatching = false;

  const _cloneEmitFunctionsIfDispatching = (): void => {
    if (_isDispatching) {
      _emitFunctions = _emitFunctions.slice();
    }
  };

  const subscribe: ISubscribeFunction<GValue> = (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let running: boolean = true;
    _cloneEmitFunctionsIfDispatching();
    _emitFunctions.push(emit);
    return () => {
      if (running) {
        running = false;
        const index: number = _emitFunctions.indexOf(emit);
        _emitFunctions[index] = noop;
        _cloneEmitFunctionsIfDispatching();
        _emitFunctions.splice(index, 1);
      }
    };
  };

  return Object.freeze({
    getObservers(): readonly IEmitFunction<GValue>[] {
      return _emitFunctions;
    },
    emit: (value: GValue): void => {
      if (_isDispatching) {
        throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
      } else {
        const emitFunctions: IEmitFunction<GValue>[] = _emitFunctions;
        const lengthMinusOne: number = emitFunctions.length - 1;
        if (lengthMinusOne >= 0) {
          _isDispatching = true;
          for (let i = 0; i < lengthMinusOne; i++) {
            emitFunctions[i](value);
          }
          _isDispatching = false;
          emitFunctions[lengthMinusOne](value);
        }
      }
    },
    subscribe: (
      options.disableDuplicateSubscribeVerification
        ? subscribe
        : (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
          if (_emitFunctions.includes(emit)) {
            throw new Error(`Already subscribed to this Source`);
          } else {
          }
          return subscribe(emit);
        }
    ),
  });
}

