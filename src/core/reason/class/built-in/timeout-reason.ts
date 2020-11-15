import { Reason } from '../reason-class';

export class TimeoutReason extends Reason<'timeout'> {
  static discard(reason: any): void | never {
    if (!(reason instanceof TimeoutReason)) {
      throw reason;
    }
  }

  constructor(message: string = 'Timeout reached') {
    super(message, 'timeout');
  }
}
