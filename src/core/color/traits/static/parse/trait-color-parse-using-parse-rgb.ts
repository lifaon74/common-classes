import { Trait } from '@lifaon/traits';
import { TraitColorParse } from './trait-color-parse';
import { TraitColorParseRGBUsingAlloc } from './trait-color-parse-rgb-using-alloc';


export interface ITraitColorParseUsingParseRGBGSelfConstraint<GReturn> extends
  // traits
  TraitColorParseRGBUsingAlloc<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorParseUsingParseRGB<GSelf extends ITraitColorParseUsingParseRGBGSelfConstraint<GReturn>, GReturn> extends TraitColorParse<GSelf, GReturn | null> {
  parse(this: GSelf, input: string): GReturn | null {
    const element: HTMLElement = document.createElement('div');
    element.style.setProperty('color', input);

    if (element.style.getPropertyValue('color')) {
      document.body.appendChild(element);
      const style: CSSStyleDeclaration = window.getComputedStyle(element);
      const rgbColor: string = style.color;
      document.body.removeChild(element);
      return this.parseRGB(rgbColor);
    } else {
      return null;
    }
  }
}
