import { TGenericColorStruct } from '../../../color-struct';
import { Impl } from '@lifaon/traits';
import {
  ITraitColorEqualsUsingGetColorsGSelfConstraint, TraitColorEqualsUsingGetColors
} from '../../../../../../traits/comparison/equals/trait-color-equals-using-get-colors';


export interface IImplTraitEqualsForColorStructGSelfConstraint extends TGenericColorStruct, ITraitColorEqualsUsingGetColorsGSelfConstraint {
}


@Impl()
export class ImplTraitEqualsForColorStruct<GSelf extends IImplTraitEqualsForColorStructGSelfConstraint> extends TraitColorEqualsUsingGetColors<GSelf> {
}


// @Impl()
// export class ImplTraitEqualsForColorStruct<GSelf extends TGenericColorStruct> extends TraitEquals<GSelf, TGenericColorStruct> {
//   equals(this: GSelf, color: TGenericColorStruct): boolean {
//     const contextA: IColorPrivateContext = this[COLOR_PRIVATE_CONTEXT];
//     const contextB: IColorPrivateContext = color[COLOR_PRIVATE_CONTEXT];
//
//     return (contextA.r === contextB.r)
//       && (contextA.g === contextB.g)
//       && (contextA.b === contextB.b)
//       && (contextA.a === contextB.a);
//   }
// }

