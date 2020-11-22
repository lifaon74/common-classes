import { IQueuePrivateContext, IQueueStruct, QUEUE_PRIVATE_CONTEXT, } from '../struct/queue-struct';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitQueueForQueueStruct } from '../struct/implementations/queue-struct-queue-implementation';

/** CONSTRUCTOR **/

export function ConstructQueue(
  instance: IQueueStruct,
): void {
  CreatePrivateContext<IQueuePrivateContext>(
    QUEUE_PRIVATE_CONTEXT,
    instance,
    {
      queue: Promise.resolve(),
    },
  );
}

/** CLASS **/

export interface IQueueImplementations extends
  // implementations
  ImplTraitQueueForQueueStruct<IQueue>
  //
{
}

export const QueueImplementations = [
  ImplTraitQueueForQueueStruct,
];

export interface IQueueImplementationsConstructor {
  new(): IQueueImplementations;
}

export interface IQueue extends IQueueStruct, IQueueImplementations {
}

const QueueImplementationsConstructor = AssembleTraitImplementations<IQueueImplementationsConstructor>(QueueImplementations);

export class Queue extends QueueImplementationsConstructor implements IQueue {
  readonly [QUEUE_PRIVATE_CONTEXT]: IQueuePrivateContext;

  constructor() {
    super();
    ConstructQueue(this);
  }
}
