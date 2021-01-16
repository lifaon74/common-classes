import { ICommand } from './command-compiler-interface';

const COMMAND_BRACKET_PATTERN: string = '\\*(.+)';
const COMMAND_PREFIX_PATTERN: string = 'cmd-(.+)';
const COMMAND_PATTERN: string = `(?:${ COMMAND_BRACKET_PATTERN })`
  + `|(?:${ COMMAND_PREFIX_PATTERN })`;
const COMMAND_REGEXP: RegExp = new RegExp(`^${COMMAND_PATTERN}$`);

/**
 * Syntax:
 *  - standard: *name
 *  - prefixed: cmd-name
 */
export function extractCommand(
  attribute: Attr,
): ICommand | null {
  const match: RegExpExecArray | null = COMMAND_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[2] !== void 0);
    return Object.freeze({
      name: prefixMode ? match[2] : match[1],
      value: attribute.value.trim(),
      prefixMode,
      attribute,
    });
  }
}




