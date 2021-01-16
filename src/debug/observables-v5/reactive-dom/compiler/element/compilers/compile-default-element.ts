import { ICompilerReturn, ILines } from '../../compiler-interface';
import { nullIfEmptyLines, optionalLines, scopeLines } from '../../snipets';
import { compileAttributes } from '../../attributes/compile-attributes';
import { compileNodes } from '../../nodes/compile-nodes';
import { extractCommands } from '../../commands/extract-commands';
import { ICommand } from '../../command/command-compiler-interface';
import { compileCommands } from '../../commands/compile-commands';


export function compileDefaultElement(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();


  let attributes: Attr[] = Array.from(node.attributes);
  const commands: ICommand[] = extractCommands(attributes);
  attributes = attributes.filter((attribute: Attr) => {
    return commands.some((command: ICommand) => {
      return (command.attribute === attribute);
    });
  });

  const lines: ILines = scopeLines([
    `// element '${ name }'`,
    `const node = createElement(${ JSON.stringify(name) });`,
    `attachNode(node, parentNode);`,
  ]);

  const compiledAttributes: ICompilerReturn = compileAttributes(attributes);
  if (compiledAttributes !== null) {
    lines.push(...[
      `// attributes`,
      ...compiledAttributes,
    ]);
  }

  const compiledChildren: ICompilerReturn = compileNodes(Array.from(node.childNodes));
  if (compiledChildren !== null) {
    lines.push(...[
      `// child nodes`,
      `const parentNode = node;`,
      ...compiledChildren,
    ]);
  }

  return nullIfEmptyLines(compileCommands(commands, lines));
}
