import { ICompilerReturn } from '../compiler-interface';


export interface IAttributesCompiler {
  (attributes: Attr[]): ICompilerReturn;
}

