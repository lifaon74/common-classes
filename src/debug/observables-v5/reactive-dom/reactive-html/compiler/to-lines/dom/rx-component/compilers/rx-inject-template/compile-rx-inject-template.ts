import { ILines } from '../../../../compiler.types';
import { hasChildNodes } from '../../../../../../../light-dom/node/state/has-child-nodes';

/*
Syntax:

<rx-inject-template
  template="observable"
></rx-inject-template>

 */

export function compileRXInjectTemplate(
  node: Element,
): ILines | null {
  const name: string = node.tagName.toLowerCase();
  if (name === 'rx-inject-template') {
    let template!: string;

    const attributes: Attr[] = Array.from(node.attributes);
    for (let i = 0, l = attributes.length; i < l; i++) {
      const attribute: Attr = attributes[i];
      if (attribute.name === 'template') {
        template = attribute.value;
      } else {
        throw new Error(`Found invalid attribute '${ attribute.name }'`);
      }
    }

    if (hasChildNodes(node)) {
      throw new Error(`Should not have any children`);
    }

    return generateRXInjectTemplateLines(template);
  } else {
    return null;
  }
}


export function generateRXInjectTemplateLines(
  template: string,
): ILines {
  return [
    `// reactive template`,
    `nodeAppendChild(parentNode, createReactiveTemplateNode(${ template }));`,
  ];
}
