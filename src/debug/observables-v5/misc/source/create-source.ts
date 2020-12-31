import { noop } from '../helpers/noop';
import { IEmitFunction, IUnsubscribeFunction } from '../../types';
import { ISource } from './source-interface';

export interface ISourceOnActive {
  (): void;
}

export interface ISourceOnInactive {
  (): void;
}

export interface ICreateSourceOptions {
  readonly onActive?: ISourceOnActive;
  readonly onInactive?: ISourceOnInactive;
}

export function createSource<GValue>(
  options?: ICreateSourceOptions
): ISource<GValue> {

  let onActive: ISourceOnActive;
  let onInactive: ISourceOnActive;

  if (options === void 0) {
    onActive = noop;
    onInactive = noop;
  } else {
    onActive = (options.onActive === void 0) ? noop : options.onActive;
    onInactive = (options.onInactive === void 0) ? noop : options.onInactive;
  }

  let _emitFunctions: IEmitFunction<GValue>[] = [];
  let _isDispatching = false;

  const _cloneEmitFunctionsIfDispatching = (): void => {
    if (_isDispatching) {
      _emitFunctions = _emitFunctions.slice();
    }
  };

  return Object.freeze({
    emit: (value: GValue) => {
      if (_isDispatching) {
        throw new Error(`The Source is already dispatching a value. You probably created a recursive loop.`);
      } else {
        _isDispatching = true;
        const emitFunctions: IEmitFunction<GValue>[] = _emitFunctions;
        const lengthMinusOne: number = emitFunctions.length - 1;
        for (let i = 0; i < lengthMinusOne; i++) {
          emitFunctions[i](value);
        }
        _isDispatching = false;
        emitFunctions[lengthMinusOne](value);
      }
    },
    subscribe: (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      if (_emitFunctions.includes(emit)) {
        throw new Error(`Already subscribed to this Source`);
      } else {
        let running: boolean = true;
        _cloneEmitFunctionsIfDispatching();
        _emitFunctions.push(emit);
        if (_emitFunctions.length === 1) {
          onActive();
        }
        return () => {
          if (running) {
            running = false;
            _cloneEmitFunctionsIfDispatching();
            _emitFunctions.splice(_emitFunctions.indexOf(emit), 1);
            if (_emitFunctions.length === 0) {
              onInactive();
            }
          }
        };
      }
    },
  });
}



