import { ILines } from '../../compiler-interface';

export function compileStaticAttribute(
  attribute: Attr,
): ILines {
  return [
    `// static attribute '${ attribute.name }'`,
    `setStaticAttribute(node, ${ JSON.stringify(attribute.name) }, ${ JSON.stringify(attribute.value) });`,
  ];
}

