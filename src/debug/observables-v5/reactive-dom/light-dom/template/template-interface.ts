import { IStandardNode } from '../node/type/is-standard-node';

/**
 * A Template is a function which returns a DocumentFragment
 */
export interface ITemplate<GArguments extends any[]> {
  (...args: GArguments): DocumentFragment;
}

export type ITemplateNodeList = readonly IStandardNode[];


// export type ITemplateNodeList = ArrayLike<IStandardNode>;
//
// /**
//  * A Template is a function which returns a list of StandardNode
//  */
// export interface ITemplate<GArguments extends any[]> {
//   (...args: GArguments): ITemplateNodeList;
// }
