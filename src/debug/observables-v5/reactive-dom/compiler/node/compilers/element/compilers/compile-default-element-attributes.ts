import { ICompilerReturn } from '../../../../compiler-interface';
import { nullIfEmptyLines, optionalLines } from '../../../../snipets';
import { compileAttribute } from './attribute/compile-attribute';
import { IAttributeCompiler } from './attribute/attribute-compiler-interface';

export function compileDefaultElementAttributes(
  node: Element,
  compiler: IAttributeCompiler = compileAttribute,
): ICompilerReturn {
  const lines: string[] = [];
  for (let i = 0, l = node.attributes.length; i < l; i++) {
    lines.push(...optionalLines(compiler(node.attributes.item(i) as Attr)));
  }
  return nullIfEmptyLines(lines);
}
