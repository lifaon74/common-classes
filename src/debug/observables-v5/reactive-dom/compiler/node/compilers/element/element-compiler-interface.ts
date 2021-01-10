import { ICompilerReturn } from '../../../compiler-interface';


export interface IElementNodeCompiler {
  (node: Element): ICompilerReturn;
}

