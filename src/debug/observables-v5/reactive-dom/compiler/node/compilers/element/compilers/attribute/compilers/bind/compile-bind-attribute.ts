import { ICompilerReturn } from '../../../../../../../compiler-interface';
import { IBindPropertyCompiler } from './bind-property-compiler-interface';
import { compileReactiveProperty } from './compilers/compile-reactive-property';
import { compileReactiveAttribute } from './compilers/compile-reactive-attribute';
import { compileReactiveClass } from './compilers/compile-reactive-class';
import { compileReactiveStyle } from './compilers/compile-reactive-style';

const BIND_ATTRIBUTE_BRACKET_PATTERN: string = '\\[([^\\]]+)\\]';
const BIND_ATTRIBUTE_PREFIX_PATTERN: string = 'bind-(.+)';
const BIND_ATTRIBUTE_PATTERN: string = `(?:${ BIND_ATTRIBUTE_BRACKET_PATTERN })`
  + `|(?:${ BIND_ATTRIBUTE_PREFIX_PATTERN })`;
const BIND_ATTRIBUTE_REGEXP: RegExp = new RegExp(`^${BIND_ATTRIBUTE_PATTERN}$`);

export const BIND_ATTRIBUTE_COMPILERS: IBindPropertyCompiler[] = [
  compileReactiveAttribute,
  compileReactiveClass,
  compileReactiveStyle,
  compileReactiveProperty,
];

/**
 * Syntax:
 *  - standard: [name]
 *  - prefixed: bind-name
 */
export function compileBindAttribute(
  attribute: Attr,
  compilers: IBindPropertyCompiler[] = BIND_ATTRIBUTE_COMPILERS,
): ICompilerReturn {
  const match: RegExpExecArray | null = BIND_ATTRIBUTE_REGEXP.exec(attribute.name);
  if (match === null) {
    return null;
  } else {
    const prefixMode: boolean = (match[2] !== void 0);
    const name: string = prefixMode ? match[2] : match[1];
    const value: string = attribute.value.trim();

    for (let i = 0, l = compilers.length; i < l; i++) {
      const lines: string[] | null = compilers[i](name, value, prefixMode);
      if (lines !== null) {
        return lines;
      }
    }
    return null;
  }
}




