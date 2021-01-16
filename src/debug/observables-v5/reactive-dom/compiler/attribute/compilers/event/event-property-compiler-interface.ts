import { ICompilerReturn } from '../../../compiler-interface';

export interface IEventPropertyCompiler {
  (name: string, value: string, prefixMode: boolean): ICompilerReturn;
}
