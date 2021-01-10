import { ICompilerReturn } from '../compiler-interface';


export interface INodeCompiler {
  (node: Node): ICompilerReturn;
}

