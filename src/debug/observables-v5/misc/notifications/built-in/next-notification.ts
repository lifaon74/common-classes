import { createNotification } from '../create-notification';
import { INotification } from '../notification-interface';

export type INextNotification<GValue> = INotification<'next', GValue>;

export function createNextNotification<GValue>(
  value: GValue,
): INextNotification<GValue> {
  return createNotification<'next', GValue>('next', value);
}

/* derived */

export type IGenericNextNotification = INextNotification<any>;

export type IInferNextNotificationGValue<GNextNotification extends IGenericNextNotification> =
  GNextNotification extends INextNotification<infer GValue>
    ? GValue
    : never;
