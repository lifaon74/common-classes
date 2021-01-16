import { ICompilerReturn } from '../compiler-interface';


export interface IAttributeCompiler {
  (attribute: Attr): ICompilerReturn;
}

