import { INotification } from './notification-interface';


export function createNotification<GName extends string, GValue>(
  name: GName,
  value: GValue,
): INotification<GName, GValue> {
  return Object.freeze({
    name,
    value,
  });
}

