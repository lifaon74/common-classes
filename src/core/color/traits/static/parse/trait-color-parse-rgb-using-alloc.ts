import { ALLOC, Trait } from '@lifaon/traits';
import { TraitColorParseRGB } from './trait-color-parse-rgb';
import { TraitColorAlloc } from '../../alloc/trait-color-alloc';
import { ParseNumberLikeValue } from '../../../functions/parse-number-like-value';


const NUMBER_PATTERN: string = '\\s*(\\d+(?:\\.\\d+)?%?)\\s*';
const RGBA_REGEXP: RegExp = new RegExp(`rgb(a)?\\(${NUMBER_PATTERN},${NUMBER_PATTERN},${NUMBER_PATTERN}(?:,${NUMBER_PATTERN})?\\)`);

export interface ITraitColorParseRGBUsingAllocGSelfConstraint<GReturn> extends
  // traits
  TraitColorAlloc<any, GReturn>
  //
{
}


@Trait()
export abstract class TraitColorParseRGBUsingAlloc<GSelf extends ITraitColorParseRGBUsingAllocGSelfConstraint<GReturn>, GReturn> extends TraitColorParseRGB<GSelf, GReturn> {
  parseRGB(this: GSelf, input: string): GReturn {
    RGBA_REGEXP.lastIndex = 0;
    const match: RegExpExecArray | null = RGBA_REGEXP.exec(input);
    if ((match !== null) && (typeof match[1] === typeof match[5])) { // check if 3 params for rgb and 4 for rgba
      return this[ALLOC](
        ParseNumberLikeValue(match[2], 0, 255) / 255,
        ParseNumberLikeValue(match[3], 0, 255) / 255,
        ParseNumberLikeValue(match[4], 0, 255) / 255,
        (match[5] === void 0)
          ? 1
          : ParseNumberLikeValue(match[5], 0, 1)
      );
    } else {
      throw new Error(`Invalid rgb(a) color: ${ input }`);
    }
  }
}
