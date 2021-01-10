import { ICompilerReturn } from '../../../../compiler-interface';
import { compileDefaultElementChildren } from './compile-default-element-children';
import { optionalLines, scopeLines } from '../../../../snipets';
import { compileDefaultElementAttributes } from './compile-default-element-attributes';

export function compileDefaultElement(
  node: Element,
): ICompilerReturn {
  const name: string = node.tagName.toLowerCase();
  return [
    `// element '${ name }'`,
    `const node = createElement(${ JSON.stringify(name) });`,
    ...optionalLines(compileDefaultElementAttributes(node)),
    ...optionalLines(compileDefaultElementChildren(node), (lines: string[]) => {
      return scopeLines([
        `// child nodes`,
        `const parentNode = node;`,
        ...lines,
      ]);
    }),
    `attachNode(node, parentNode);`
  ];
}
