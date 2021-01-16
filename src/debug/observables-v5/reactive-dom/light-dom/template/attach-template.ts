import { ITemplate, ITemplateNodeList } from './template-interface';
import { attachDocumentFragment } from '../node/move/fragment/attach-document-fragment';
import { getChildNodes } from '../node/others/get-child-nodes';


export function attachTemplate<GArguments extends any[]>(
  template: ITemplate<GArguments>,
  args: GArguments,
  parentNode: Node,
  referenceNode?: Node | null,
): ITemplateNodeList {
  const fragment: DocumentFragment = template(...args);
  const nodes: ITemplateNodeList = getChildNodes(fragment) as ITemplateNodeList;
  attachDocumentFragment(fragment, parentNode, referenceNode);
  return nodes;
}

