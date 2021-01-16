import { ICompilerReturn, ILines } from '../../compiler-interface';
import { nullIfEmptyLines } from '../../snipets';
import { compileAttribute } from '../../attribute/compile-attribute';


export function compileDefaultAttributes(
  attributes: Attr[],
): ICompilerReturn {
  const lines: ILines = [];
  for (let i = 0, l = attributes.length; i < l; i++) {
    const result: ICompilerReturn = compileAttribute(attributes[i]);
    if (result !== null) {
      lines.push(...result);
    }
  }
  return nullIfEmptyLines(lines);
}

