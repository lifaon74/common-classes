import { QUEUE_PRIVATE_CONTEXT, TGenericQueueStruct, TQueuePrivateContextFromGSelf } from '../queue-struct';
import { Impl, TQueueCallback, TraitQueue } from '@lifaon/traits';


@Impl()
export class ImplTraitQueueForQueueStruct<GSelf extends TGenericQueueStruct> extends TraitQueue<GSelf> {
  queue(this: GSelf, callback: TQueueCallback): GSelf {
    const context: TQueuePrivateContextFromGSelf<GSelf> = this[QUEUE_PRIVATE_CONTEXT];
    context.queue = context.queue
      .then(callback);
    return this;
  }
}
