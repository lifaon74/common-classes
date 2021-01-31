import {
  createErrorNotification, IErrorNotification
} from '../../../../observables-v4/misc/notifications/build-in/error-notification';
import { noop } from '../../../../observables-v4/misc/helpers/noop';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';

export function throwError<GError>(
  error: GError,
): ISubscribeFunction<IErrorNotification<GError>> {
  return (emit: IEmitFunction<IErrorNotification<GError>>): IUnsubscribeFunction => {
    emit(createErrorNotification<GError>(error));
    return noop;
  };
}
