import { ICompilerReturn } from '../../../compiler-interface';
import { IEventPropertyCompiler } from './event-property-compiler-interface';
import { compileReactiveEventListener } from './compilers/compile-reactive-event-listener';

const EVENT_ATTRIBUTE_BRACKET_PATTERN: string = '\\(([^\\)]+)\\)';
const EVENT_ATTRIBUTE_PREFIX_PATTERN: string = 'on-(.+)';
const EVENT_ATTRIBUTE_PATTERN: string = `(?:${ EVENT_ATTRIBUTE_BRACKET_PATTERN })`
  + `|(?:${ EVENT_ATTRIBUTE_PREFIX_PATTERN })`;
const EVENT_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${EVENT_ATTRIBUTE_PATTERN}$`);

export const EVENT_ATTRIBUTE_COMPILERS: IEventPropertyCompiler[] = [
  compileReactiveEventListener,
];

/**
 * Syntax:
 *  - standard: (name)
 *  - prefixed: on-name
 */
export function compileEventProperty(
  attribute: Attr,
  compilers: IEventPropertyCompiler[] = EVENT_ATTRIBUTE_COMPILERS,
): ICompilerReturn {
  const match: RegExpExecArray | null = EVENT_ATTRIBUTE_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[2] !== void 0);
    const name: string = prefixMode ? match[2] : match[1];
    const value: string = attribute.value.trim();

    for (let i = 0, l = compilers.length; i < l; i++) {
      const result: ICompilerReturn = compilers[i](name, value, prefixMode);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
}




