import { IHTMLTemplate, IHTMLTemplateNodeList } from './template.type';
import { getChildNodes } from '../node/properties/get-child-nodes';
import { attachDocumentFragmentWithAttachEvent } from '../node/move/node/with-event/bulk/fragment/attach-document-fragment-with-event';
import { isDocumentFragment } from '../node/type/is-document-fragment';
import { attachNode } from '../node/move/node/attach-node';


export function attachTemplate<GArgument extends object>(
  template: IHTMLTemplate<GArgument>,
  templateArgument: GArgument,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  const fragment: DocumentFragment = template(templateArgument);
  const nodes: IHTMLTemplateNodeList = getChildNodes(fragment) as IHTMLTemplateNodeList;
  if (isDocumentFragment(parentNode)) {
    attachNode(fragment, parentNode, referenceNode);
  } else {
    attachDocumentFragmentWithAttachEvent(fragment, parentNode, referenceNode);
  }
  return nodes;
}

export function attachOptionalTemplate<GArguments extends any[]>(
  template: IHTMLTemplate<GArguments> | null,
  args: GArguments,
  parentNode: Node,
  referenceNode?: Node | null,
): IHTMLTemplateNodeList {
  if (template === null) {
    return [];
  } else {
    return attachTemplate(template, args, parentNode, referenceNode);
  }
}
