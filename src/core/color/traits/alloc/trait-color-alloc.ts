import { Trait, TraitAlloc } from '@lifaon/traits';

export type TColorAllocArgs = [
  r: number,
  g: number,
  b: number,
  a: number,
];

@Trait()
export abstract class TraitColorAlloc<GSelf, GReturn> extends TraitAlloc<GSelf, TColorAllocArgs, GReturn> {
}
