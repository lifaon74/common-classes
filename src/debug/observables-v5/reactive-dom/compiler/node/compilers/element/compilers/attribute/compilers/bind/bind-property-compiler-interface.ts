import { ICompilerReturn } from '../../../../../../../compiler-interface';

export interface IBindPropertyCompiler {
  (name: string, value: string, prefixMode: boolean): ICompilerReturn;
}
