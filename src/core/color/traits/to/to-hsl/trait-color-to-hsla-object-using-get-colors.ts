import { Trait } from '@lifaon/traits';
import { IHSLAObject, TraitColorToHSLAObject } from './trait-color-to-hsla-object';
import { ITraitGetColors } from '../../colors/interface-trait-get-colors';


export interface ITraitColorToHSLAObjectUsingGetColorsGSelfConstraint extends
  // traits
  ITraitGetColors<any>
  //
{
}

@Trait()
export abstract class TraitColorToHSLAObjectUsingGetColors<GSelf extends ITraitColorToHSLAObjectUsingGetColorsGSelfConstraint> extends TraitColorToHSLAObject<GSelf> {
  toHSLAObject(this: GSelf): IHSLAObject {
    const r: number = this.getRed();
    const g: number = this.getGreen();
    const b: number = this.getBlue();
    const a: number = this.getAlpha();

    const max: number = Math.max(r, g, b);
    const min: number = Math.min(r, g, b);

    const hslaObject: IHSLAObject = {
      h: 0,
      s: 0,
      l: (max + min) / 2,
      a: a
    };

    if (max === min) { // achromatic
      hslaObject.h = 0;
      hslaObject.s = 0;
    } else {
      const d: number = max - min;
      hslaObject.s = hslaObject.l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          hslaObject.h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          hslaObject.h = (b - r) / d + 2;
          break;
        case b:
          hslaObject.h = (r - g) / d + 4;
          break;
      }
      hslaObject.h /= 6;
    }

    return hslaObject;
  }
}


