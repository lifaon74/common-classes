import { compileBindProperty } from './compilers/bind/compile-bind-property';
import { IAttributeCompiler } from './attribute-compiler-interface';
import { compileStaticAttribute } from './compilers/compile-static-attribute';
import { ICompilerReturn } from '../compiler-interface';
import { compileEventProperty } from './compilers/event/compile-event-property';

export const ATTRIBUTE_COMPILERS: IAttributeCompiler[] = [
  // compileBindProperty,
  // compileEventProperty,
  compileStaticAttribute,
];

export function compileAttribute(
  attribute: Attr,
  compilers: IAttributeCompiler[] = ATTRIBUTE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const result: ICompilerReturn = compilers[i](attribute);
    if (result !== null) {
      return result;
    }
  }
  return null;
}


