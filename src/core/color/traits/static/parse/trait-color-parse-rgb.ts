import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitColorParseRGB<GSelf, GReturn> {
  abstract parseRGB(this: GSelf, input: string): GReturn;
}
