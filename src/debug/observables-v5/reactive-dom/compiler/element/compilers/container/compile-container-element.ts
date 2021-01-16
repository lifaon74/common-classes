import { ILines } from '../../../compiler-interface';


export function compileContainerElement(
  node: Element,
): ILines | null {
  if (node.tagName.toLowerCase() === 'container') {
    return [
      `// container`,
      `const node = new ContainerNode();`,
      `attachNode(node, parentNode);`
    ];
  } else {
    return null;
  }
}
