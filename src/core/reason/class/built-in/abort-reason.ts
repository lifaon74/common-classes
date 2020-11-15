import { Reason } from '../reason-class';

export class AbortReason extends Reason<'abort'> {
  static discard(reason: any): void | never {
    if (!(reason instanceof AbortReason)) {
      throw reason;
    }
  }

  constructor(message: string = 'Aborted') {
    super(message, 'abort');
  }
}
