import { ILines } from '../compiler-interface';
import { ICommand } from '../command/command-compiler-interface';


export interface ICommandsCompiler {
  (commands: ICommand[], lines: ILines): ILines;
}

