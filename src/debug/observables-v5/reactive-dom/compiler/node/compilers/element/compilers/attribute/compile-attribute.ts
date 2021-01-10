import { compileBindAttribute } from './compilers/bind/compile-bind-attribute';
import { IAttributeCompiler } from './attribute-compiler-interface';
import { compileStaticAttribute } from './compilers/compile-static-attribute';
import { ICompilerReturn } from '../../../../../compiler-interface';

export const ATTRIBUTE_COMPILERS: IAttributeCompiler[] = [
  compileBindAttribute,
  compileStaticAttribute,
];

export function compileAttribute(
  attribute: Attr,
  compilers: IAttributeCompiler[] = ATTRIBUTE_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const lines: string[] | null = compilers[i](attribute);
    if (lines !== null) {
      return lines;
    }
  }
  return null;
}


