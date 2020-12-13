import { ALLOC, Trait } from '@lifaon/traits';
import { TraitColorAlloc } from '../../alloc/trait-color-alloc';
import { TraitColorFromHSLAObject } from './trait-color-from-hsla-object';
import { IHSLAObject } from '../../to/to-hsl/trait-color-to-hsla-object';


function HueToRGB(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}


export interface ITraitColorFromHSLAObjectUsingAllocGSelfConstraint<GReturn> extends
  // traits
  TraitColorAlloc<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorFromHSLAObjectUsingAlloc<GSelf extends ITraitColorFromHSLAObjectUsingAllocGSelfConstraint<GReturn>, GReturn> extends TraitColorFromHSLAObject<GSelf, GReturn> {
  fromHSLAObject(this: GSelf, hslaObject: IHSLAObject): GReturn {
    let r: number, g: number, b: number;

    if (hslaObject.s === 0) {
      r = g = b = hslaObject.l; // achromatic
    } else {
      const q: number = hslaObject.l < 0.5 ? hslaObject.l * (1 + hslaObject.s) : hslaObject.l + hslaObject.s - hslaObject.l * hslaObject.s;
      const p: number = 2 * hslaObject.l - q;
      r = HueToRGB(p, q, hslaObject.h + 1 / 3);
      g = HueToRGB(p, q, hslaObject.h);
      b = HueToRGB(p, q, hslaObject.h - 1 / 3);
    }

    return this[ALLOC](
      r,
      g,
      b,
      hslaObject.a ? (hslaObject.a) : 1
    );
  }
}
