import { ILines } from '../../../compiler.types';
import { ICommand } from '../../../../__old/command/command-compiler-interface';
import { compileCommand } from '../../../../__old/command/compile-command';


export function compileDefaultCommands(
  commands: ICommand[],
  lines: ILines,
): ILines {
  for (let i = 0, l = commands.length; i < l; i++) {
    lines = compileCommand(commands[i], lines);
  }
  return lines;
}

