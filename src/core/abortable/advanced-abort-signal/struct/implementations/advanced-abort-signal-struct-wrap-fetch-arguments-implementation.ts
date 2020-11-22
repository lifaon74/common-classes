import { Impl } from '@lifaon/traits';
import { TGenericAdvancedAbortSignalStruct } from '../advanced-abort-signal-struct';
import {
  ITraitAdvancedAbortSignalWrapFetchArgumentsUsingToAbortControllerGSelfConstraint,
  TraitAdvancedAbortSignalWrapFetchArgumentsUsingToAbortController
} from '../../traits/trait-advanced-abort-signal-wrap-fetch-arguments/trait-advanced-abort-signal-wrap-fetch-arguments-using-to-abort-controller';

export interface IImplTraitWrapFetchArgumentsForAdvancedAbortSignalStructGSelfConstraint extends TGenericAdvancedAbortSignalStruct,
  ITraitAdvancedAbortSignalWrapFetchArgumentsUsingToAbortControllerGSelfConstraint {
}

@Impl()
export class ImplTraitWrapFetchArgumentsForAdvancedAbortSignalStruct<GSelf extends IImplTraitWrapFetchArgumentsForAdvancedAbortSignalStructGSelfConstraint> extends TraitAdvancedAbortSignalWrapFetchArgumentsUsingToAbortController<GSelf> {
}
