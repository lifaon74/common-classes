import { Trait } from '@lifaon/traits';

export type TTraitAdvancedAbortSignalWrapPromiseOnFulfilled<GValue> = (value: GValue) => void
export type TTraitAdvancedAbortSignalWrapPromiseOnRejected = (error: any) => void
export type TTraitAdvancedAbortSignalWrapPromiseOnAborted = (reason: any) => void

@Trait()
export abstract class TraitAdvancedAbortSignalWrapPromise<GSelf> {
  abstract wrapPromise<GValue>(
    this: GSelf,
    promise: Promise<GValue>,
    onFulfilled: TTraitAdvancedAbortSignalWrapPromiseOnFulfilled<GValue>,
    onRejected: TTraitAdvancedAbortSignalWrapPromiseOnRejected,
    onAborted: TTraitAdvancedAbortSignalWrapPromiseOnAborted,
  ): void;
}


