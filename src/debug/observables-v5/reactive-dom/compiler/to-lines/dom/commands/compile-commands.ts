import { ICommandsCompiler } from './commands-compiler-interface';
import { ICompilerReturn, ILines } from '../../compiler.types';
import { ICommand } from '../../../__old/command/command-compiler-interface';
import { compileDefaultCommands } from './compilers/compile-default-commands';

export const COMMANDS_COMPILERS: ICommandsCompiler[] = [
  compileDefaultCommands,
];

export function compileCommands(
  commands: ICommand[],
  lines: ILines,
  compilers: ICommandsCompiler[] = COMMANDS_COMPILERS,
): ILines {
  for (let i = 0, l = compilers.length; i < l; i++) {
    lines = compilers[i](commands, lines);
  }
  return lines;
}


