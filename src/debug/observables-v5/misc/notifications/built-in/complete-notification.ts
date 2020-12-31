import { createNotification } from '../create-notification';
import { INotification } from '../notification-interface';

export type ICompleteNotification = INotification<'complete', void>;

export function createCompleteNotification(): ICompleteNotification {
  return createNotification<'complete', void>('complete', void 0);
}

export const STATIC_COMPLETE_NOTIFICATION: ICompleteNotification = createCompleteNotification();
