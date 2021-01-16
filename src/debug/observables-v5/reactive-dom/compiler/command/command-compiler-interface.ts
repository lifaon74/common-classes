import { ICompilerReturn, IInjectCompilerReturn, ILines } from '../compiler-interface';

export interface ICommand {
  readonly name: string;
  readonly value: string;
  readonly prefixMode: boolean;
  readonly attribute: Attr;
}

// export interface ICommandExtractor {
//   (attribute: Attr): ICommand | null;
// }


export interface ICommandCompiler {
  (command: ICommand, lines: ILines): ILines;
}


