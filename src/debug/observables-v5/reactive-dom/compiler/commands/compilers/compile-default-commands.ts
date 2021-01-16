import { ILines } from '../../compiler-interface';
import { ICommand } from '../../command/command-compiler-interface';
import { compileCommand } from '../../command/compile-command';


export function compileDefaultCommands(
  commands: ICommand[],
  lines: ILines,
): ILines {
  for (let i = 0, l = commands.length; i < l; i++) {
    lines = compileCommand(commands[i], lines);
  }
  return lines;
}

