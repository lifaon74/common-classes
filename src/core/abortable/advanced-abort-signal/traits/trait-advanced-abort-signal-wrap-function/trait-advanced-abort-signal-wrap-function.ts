import { TGenericFunction, Trait } from '@lifaon/traits';

export type TTraitAdvancedAbortSignalWrapFunctionOnAborted = (reason: any) => any;
export type TTraitAdvancedAbortSignalWrapFunctionReturnedFunction<GFunction extends TGenericFunction, GOnAborted extends TTraitAdvancedAbortSignalWrapFunctionOnAborted> =
  (...args: Parameters<GFunction>) => TTraitAdvancedAbortSignalWrapFunctionReturn<GFunction, GOnAborted>;

export type TTraitAdvancedAbortSignalWrapFunctionReturn<GFunction extends TGenericFunction, GOnAborted extends TTraitAdvancedAbortSignalWrapFunctionOnAborted> =
  ReturnType<GFunction>
  | ReturnType<GOnAborted>;

@Trait()
export abstract class TraitAdvancedAbortSignalWrapFunction<GSelf> {
  abstract wrapFunction<GFunction extends TGenericFunction, GOnAborted extends TTraitAdvancedAbortSignalWrapFunctionOnAborted>(
    this: GSelf,
    callback: GFunction,
    onAborted: GOnAborted,
  ): TTraitAdvancedAbortSignalWrapFunctionReturnedFunction<GFunction, GOnAborted>;
}

