import { ILines } from '../compiler-interface';
import { ICommand, ICommandCompiler } from './command-compiler-interface';


export const COMMAND_COMPILERS: ICommandCompiler[] = [
  // compileReactiveConditionalNode,
];

/**
 * Syntax:
 *  - standard: *name
 *  - prefixed: cmd-name
 */
export function compileCommand(
  command: ICommand,
  lines: ILines,
  compilers: ICommandCompiler[] = COMMAND_COMPILERS,
): ILines {
  throw 'TODO'; // TODO
  // const match: RegExpExecArray | null = COMMAND_ATTRIBUTE_REGEXP.exec(attribute.name);
  // if (match === null) {
  //   return null;
  // } else {
  //   const prefixMode: boolean = (match[2] !== void 0);
  //   const name: string = prefixMode ? match[2] : match[1];
  //   const value: string = attribute.value.trim();
  //
  //   for (let i = 0, l = compilers.length; i < l; i++) {
  //     const result: IInjectCompilerReturn = compilers[i](name, value, prefixMode);
  //     if (result !== null) {
  //       return result;
  //     }
  //   }
  //   return null;
  // }
}




