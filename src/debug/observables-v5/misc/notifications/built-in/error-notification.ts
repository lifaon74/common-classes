import { createNotification } from '../create-notification';
import { INotification } from '../notification.type';
import { IAbortError, IAbortErrorOptions } from '../../errors/abort-error/abort-error.type';
import { createAbortError } from '../../errors/abort-error/create-abort-error';

export type IErrorNotification<GError = any> = INotification<'error', GError>;

export function createErrorNotification<GError>(
  error: GError,
): IErrorNotification<GError> {
  return createNotification<'error', GError>('error', error);
}

export function createAbortErrorNotification(
  options?: IAbortErrorOptions
): IErrorNotification<IAbortError> {
  return createErrorNotification<IAbortError>(createAbortError(options));
}

