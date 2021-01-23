import { ICompilerReturn, ILines } from '../../to-lines/compiler.types';

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


