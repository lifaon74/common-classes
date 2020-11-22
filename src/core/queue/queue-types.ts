import { TraitIsImplementedBy, TraitQueue } from '@lifaon/traits';

export interface IQueueLike extends TraitQueue<any> {
}

export type TGenericQueueLike = IQueueLike;


export function IsQueueLike(value: any): value is IQueueLike {
  return TraitIsImplementedBy(TraitQueue, value);
}

