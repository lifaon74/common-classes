import { ICompilerReturn } from '../../../../compiler-interface';

export function compileStaticTextNode(
  node: Text,
): ICompilerReturn {
  return compileStaticText(node.data);
}


export function compileStaticText(
  text: string,
): ICompilerReturn {
  return (text === '')
    ? null
    : compileStaticTextNotEmpty(text);
}

export function compileStaticTextNotEmpty(
  text: string,
): string[] {
  return [
    `// static text node`,
    `attachNode(createStaticTextNode(${ JSON.stringify(text) }), parentNode);`,
  ];
}
