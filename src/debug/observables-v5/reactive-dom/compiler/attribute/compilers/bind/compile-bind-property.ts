import { ICompilerReturn } from '../../../compiler-interface';
import { IBindPropertyCompiler } from './bind-property-compiler-interface';
import { compileReactiveProperty } from './compilers/compile-reactive-property';
import { compileReactiveAttribute } from './compilers/compile-reactive-attribute';
import { compileReactiveClass } from './compilers/compile-reactive-class';
import { compileReactiveStyle } from './compilers/compile-reactive-style';

const BIND_PROPERTY_BRACKET_PATTERN: string = '\\[([^\\]]+)\\]';
const BIND_PROPERTY_PREFIX_PATTERN: string = 'bind-(.+)';
const BIND_PROPERTY_PATTERN: string = `(?:${ BIND_PROPERTY_BRACKET_PATTERN })`
  + `|(?:${ BIND_PROPERTY_PREFIX_PATTERN })`;
const BIND_PROPERTY_REGEXP: RegExp = new RegExp(`^${BIND_PROPERTY_PATTERN}$`);

export const BIND_PROPERTY_COMPILERS: IBindPropertyCompiler[] = [
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
export function compileBindProperty(
  attribute: Attr,
  compilers: IBindPropertyCompiler[] = BIND_PROPERTY_COMPILERS,
): ICompilerReturn {
  const match: RegExpExecArray | null = BIND_PROPERTY_REGEXP.exec(attribute.name);
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




