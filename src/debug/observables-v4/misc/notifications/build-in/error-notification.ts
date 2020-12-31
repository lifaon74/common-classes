import { createNotification } from '../create-notification';
import { INotification } from '../notification-interface';

export type IErrorNotification<GError = any> = INotification<'error', GError>;

export function createErrorNotification<GError>(
  error: GError,
): IErrorNotification<GError> {
  return createNotification<'error', GError>('error', error);
}

