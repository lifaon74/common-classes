import { IAttributesCompiler } from './attributes-compiler-interface';
import { ICompilerReturn } from '../compiler-interface';
import { compileDefaultAttributes } from './compilers/compile-default-attributes';

export const ATTRIBUTES_COMPILERS: IAttributesCompiler[] = [
  compileDefaultAttributes,
];

export function compileAttributes(
  attributes: Attr[],
  compilers: IAttributesCompiler[] = ATTRIBUTES_COMPILERS,
): ICompilerReturn {
  for (let i = 0, l = compilers.length; i < l; i++) {
    const result: ICompilerReturn = compilers[i](attributes);
    if (result !== null) {
      return result;
    }
  }
  return null;
}


