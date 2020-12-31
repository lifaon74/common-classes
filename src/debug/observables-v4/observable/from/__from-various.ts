import { IGenericObservable, IObservable, IObservableUnsubscribeFunction, Observable } from '../../core/observable';
import { IObserver } from '../../core/observer';
import { noop } from '../../misc/helpers/noop';
import { createErrorNotification, IErrorNotification } from '../../misc/notifications/build-in/error-notification';
import { mapOperator } from '../../operators/map';
import { distinctOperator } from '../../operators/distinct';
import { combineLatest, ICombineLatestObservablesValues } from './many/combine-latest';


export function throwError<GError>(error: GError): IObservable<IErrorNotification<GError>> {
  return new Observable<IErrorNotification<GError>>((observer: IObserver<IErrorNotification<GError>>): IObservableUnsubscribeFunction => {
    observer.emit(createErrorNotification<GError>(error));
    return noop;
  });
}


/*----*/


/*----*/

export function tuple<GTuple extends any[]>(
  ...tuple: GTuple
): GTuple {
  return tuple;
}

/*----*/

export interface IFunctionLikeReduceFunction<GObservables extends IGenericObservable[], GOut> {
  (values: ICombineLatestObservablesValues<GObservables>): GOut;
}

export function functionLike<GObservables extends IGenericObservable[], GOut>(
  observables: GObservables,
  reducer: IFunctionLikeReduceFunction<GObservables, GOut>,
): IObservable<GOut> {
  return combineLatest<GObservables>(observables)
    .pipe(
      mapOperator<ICombineLatestObservablesValues<GObservables>, GOut>(reducer),
      distinctOperator<GOut>(),
    );
}

/*----*/

export type IAndObservablesValues<GObservables extends IObservable<boolean>[]> = {
  [GKey in keyof GObservables]: GObservables[GKey] extends IObservable<boolean>
    ? boolean
    : never;
};

export function and<GObservables extends IObservable<boolean>[]>(
  observables: GObservables
): IObservable<boolean> {
  return functionLike(
    observables,
    (values: readonly boolean[]) => {
      for (let i = 0, l = values.length; i < l; i++) {
        if (!values[i]) {
          return false;
        }
      }
      return true;
    }
  );
}



