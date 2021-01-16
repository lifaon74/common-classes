import { ICompilerReturn } from '../compiler-interface';


export interface INodesCompiler {
  (nodes: Node[]): ICompilerReturn;
}

