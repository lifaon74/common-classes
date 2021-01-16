import { INextNotification } from '../misc/notifications/built-in/next-notification';
import { ICompleteNotification } from '../misc/notifications/built-in/complete-notification';
import { IErrorNotification } from '../misc/notifications/built-in/error-notification';

/** NOTIFICATIONS **/

export type IDefaultNotificationsUnion<GValue> =
  INextNotification<GValue>
  | ICompleteNotification
  | IErrorNotification
  ;

export type IGenericDefaultNotificationsUnion = IDefaultNotificationsUnion<any>;