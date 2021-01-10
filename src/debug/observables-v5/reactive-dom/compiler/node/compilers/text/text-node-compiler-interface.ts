import { ICompilerReturn } from '../../../compiler-interface';


export interface ITextNodeCompiler {
  (node: Text): ICompilerReturn;
}

