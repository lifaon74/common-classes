export function compileStaticAttribute(
  attribute: Attr,
): string[] {
  return [
    `// static attribute '${ attribute.name }'`,
    `setStaticAttribute(node, ${ JSON.stringify(attribute.name) }, ${ JSON.stringify(attribute.value) });`,
  ];
}

