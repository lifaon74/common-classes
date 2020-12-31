import { ILockError, ILockErrorOptions } from './lock-error-interface';

export function createLockError(
  options?: ILockErrorOptions
): ILockError {
  const error: ILockError = new Error(options?.message);
  error.name = 'LockError';
  return error;
}

