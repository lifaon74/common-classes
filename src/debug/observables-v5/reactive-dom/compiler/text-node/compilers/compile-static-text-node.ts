import { ILines } from '../../compiler-interface';

export function compileStaticTextNode(
  node: Text,
): ILines | null {
  return compileStaticText(node.data);
}

/*------*/

export function compileStaticText(
  text: string,
): ILines | null {
  return (text === '')
    ? null
    : compileStaticTextNotEmpty(text);
}

export function compileStaticTextNotEmpty(
  text: string,
): ILines {
  return [
    `// static text node`,
    `attachNode(createStaticTextNode(${ JSON.stringify(text) }), parentNode);`,
  ];
}
