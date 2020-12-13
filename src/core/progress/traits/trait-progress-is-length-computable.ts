import { Trait } from '@lifaon/traits';

@Trait()
export abstract class TraitProgressIsLengthComputable<GSelf> {
  abstract isLengthComputable(this: GSelf): boolean;
}


