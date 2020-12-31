import { ILockError } from './lock-error-interface';

export function isLockError(value: any): value is ILockError {
  return value.name === 'LockError';
}

