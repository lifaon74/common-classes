import { extractCommand } from '../../../__old/command/extract-command';
import { ICommand } from '../../../__old/command/command-compiler-interface';

export function extractCommands(
  attributes: Attr[],
): ICommand[] {
  const commands: ICommand[] = [];
  for (let i = 0, l = attributes.length; i < l; i++) {
    const command: ICommand | null = extractCommand(attributes[i]);
    if (command !== null) {
      commands.push(command);
    }
  }
  return commands;
}




