import { Trait } from '@lifaon/traits';
import { IHSLAObject, TraitColorToHSLAObject } from './trait-color-to-hsla-object';
import { TraitColorToHSL } from './trait-color-to-hsl';

export interface ITraitColorToHSLUsingToHSLAObjectGSelfConstraint extends
  // traits
  TraitColorToHSLAObject<any>
  //
{
}

@Trait()
export abstract class TraitColorToHSLUsingToHSLAObject<GSelf extends ITraitColorToHSLUsingToHSLAObjectGSelfConstraint> extends TraitColorToHSL<GSelf> {
  toHSL(this: GSelf, alpha: boolean = false): string {
    const hsla: IHSLAObject = this.toHSLAObject();
    return `hsl${ alpha ? 'a' : '' }(${ hsla.h * 360 }, ${ hsla.s * 100 }%, ${ hsla.l * 100 }%${ alpha ? (', ' + hsla.a) : '' })`;
  }
}


