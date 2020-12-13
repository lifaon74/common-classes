import { Trait } from '@lifaon/traits';


@Trait()
export abstract class TraitColorParse<GSelf, GReturn> {
  abstract parse(this: GSelf, input: string): GReturn;
}
