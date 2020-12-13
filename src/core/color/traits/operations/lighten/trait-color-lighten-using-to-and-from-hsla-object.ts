import { Trait } from '@lifaon/traits';
import { TraitColorLighten } from './trait-color-lighten';
import { IHSLAObject, TraitColorToHSLAObject } from '../../to/to-hsl/trait-color-to-hsla-object';
import { TraitColorFromHSLAObjectUsingAlloc } from '../../static/from-hsla-object/trait-color-from-hsla-object-using-alloc';


export interface ITraitColorLightenUsingToAndFromHSLAObjectGSelfConstraint<GReturn> extends
  // traits
  TraitColorToHSLAObject<any>
  //
{
  constructor: TraitColorFromHSLAObjectUsingAlloc<any, GReturn>;
}


@Trait()
export abstract class TraitColorLightenUsingToAndFromHSLAObject< // generics
  GSelf extends ITraitColorLightenUsingToAndFromHSLAObjectGSelfConstraint<GReturn>,
  GReturn
  //
  > extends TraitColorLighten<GSelf, GReturn> {
  lighten(this: GSelf, amount: number): GReturn {
    const hsla: IHSLAObject = this.toHSLAObject();
    hsla.l = Math.max(0, Math.min(1, hsla.l + amount));
    return this.constructor.fromHSLAObject(hsla);
    /*return CallTargetTraitMethodOrDefaultImplementation<TraitColorFromHSLAObject<any, GReturn>, 'fromHSLAObject'>(
      this.constructor,
      TraitColorFromHSLAObject,
      'fromHSLAObject',
      [hsla],
      TraitColorFromHSLAObjectUsingAlloc,
    );
     */
  }
}


