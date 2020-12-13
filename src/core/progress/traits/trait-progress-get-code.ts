import { Trait } from '@lifaon/traits';
import { TCode } from '../../reason/reason-types';

@Trait()
export abstract class TraitProgressGetCode<GSelf, GCode extends TCode> {
  abstract getCode(this: GSelf): GCode;
}


