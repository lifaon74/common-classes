import { ILines } from '../../compiler.types';
import { ICommand } from '../../../__old/command/command-compiler-interface';


export interface ICommandsCompiler {
  (commands: ICommand[], lines: ILines): ILines;
}

