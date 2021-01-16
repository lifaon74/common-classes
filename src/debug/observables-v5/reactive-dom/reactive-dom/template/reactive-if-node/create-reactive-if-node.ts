import { ContainerNode } from '../../../light-dom/node/create/container-node/container-node';
import { uuid } from '../../../../misc/helpers/uuid';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { ITemplate, ITemplateNodeList } from '../../../light-dom/template/template-interface';
import { createDocumentFragment } from '../../../light-dom/node/create/create-document-fragment';
import { detachStandardNodes } from '../../../light-dom/node/move/devired/many/detach-standard-nodes';
import { attachTemplate } from '../../../light-dom/template/attach-template';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';

export function createReactiveIfNode(
  subscribe: ISubscribeFunction<boolean>,
  templateTrue: ITemplate<[]> = createDocumentFragment,
  templateFalse: ITemplate<[]> = createDocumentFragment,
): Comment {
  const containerNode: ContainerNode = new ContainerNode(`IF - ${ uuid() }`, true);

  let nodes: ITemplateNodeList = [];

  subscribeOnNodeConnectedTo<boolean>(containerNode, subscribe, (value: boolean) => {
    detachStandardNodes(nodes);
    nodes = attachTemplate<[]>(
      value
        ? templateTrue
        : templateFalse,
      [],
      containerNode,
      null
    );
  });

  return containerNode;
}

