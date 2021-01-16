import { ContainerNode } from '../../../light-dom/node/create/container-node/container-node';
import { uuid } from '../../../../misc/helpers/uuid';
import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { ITemplate, ITemplateNodeList } from '../../../light-dom/template/template-interface';
import { trackByIdentity } from './track-by-identity';
import { ISource } from '../../../../source/source';
import { getChildNodes } from '../../../light-dom/node/others/get-child-nodes';
import { pipeSubscribeFunction } from '../../../../functions/piping/pipe-subscribe-function';
import { detachStandardNode } from '../../../light-dom/node/move/standard/detach-standard-node';
import { moveStandardNodes } from '../../../light-dom/node/move/devired/many/move-standard-nodes';
import {
  createMulticastReplayLastSource, createReplayLastSource
} from '../../../../source/replay-last-source/create-replay-last-source';
import { IEmitFunction } from '../../../../types/emit-function/emit-function';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function';
import { distinctEmitPipe } from '../../../../pipes/distinct-emit-pipe';

interface INodesAndIndex {
  nodes: ITemplateNodeList;
  index: IEmitFunction<number>;
}

// map from a value to a list of template's node
type ITrackByMap = Map<any, INodesAndIndex[]>;

function createTrackByMap(): ITrackByMap {
  return new Map<any, INodesAndIndex[]>();
}

/**
 * Gets and removes a INodesAndIndex from 'trackByMap'
 */
function popNodesOfTrackByMap(
  trackByMap: ITrackByMap,
  trackedBy: any,
): INodesAndIndex {
  const nodeList: INodesAndIndex[] = trackByMap.get(trackedBy) as INodesAndIndex[];
  const nodes: INodesAndIndex = nodeList.shift() as INodesAndIndex; // or pop
  if (nodeList.length === 0) {
    trackByMap.delete(trackedBy);
  }
  return nodes;
}

/**
 * Appends a INodesAndIndex into 'trackByMap'
 */
function pushNodesIntoTrackByMap(
  trackByMap: ITrackByMap,
  trackedBy: any,
  nodes: INodesAndIndex,
): void {
  if (trackByMap.has(trackedBy)) {
    (trackByMap.get(trackedBy) as INodesAndIndex[]).push(nodes);
  } else {
    trackByMap.set(trackedBy, [nodes]);
  }
}


/*--*/

// type IStandardNodeOrDocumentFragment = IStandardNode | DocumentFragment;
//
// interface IGenerateNodesFromItemsReturn {
//   readonly currentTrackByMap: ITrackByMap; // the trackByMap generated
//   readonly nodes: IStandardNodeOrDocumentFragment[]; // the list of nodes to append (DocumentFragment) / move (IStandardNode)
// }

// type ITemplateNodeListOrDocumentFragment = ITemplateNodeList | DocumentFragment;

interface IGenerateNodesFromItemsReturn {
  readonly currentTrackByMap: ITrackByMap; // the trackByMap generated
  readonly nodesAndIndexList: INodesAndIndex[]; // the list of nodes to append / move
}

/**
 * Generates the list of nodes from a list of items
 * INFO: its tries to recycle nodes present into previousTrackByMap
 * INFO: for performance reason, the nodes will be moved / attached after we remove the unused ones
 */
function generateNodesForReactiveForLoopNode<GItem>(
  previousTrackByMap: ITrackByMap,
  template: IReactiveForLoopNodeTemplate<GItem>,
  items: Iterable<GItem>,
  trackBy: IReactiveForLoopNodeTrackByFunction<GItem>,
): IGenerateNodesFromItemsReturn {
  const currentTrackByMap: ITrackByMap = createTrackByMap();
  const nodesAndIndexList: INodesAndIndex[] = [];

  // iterate over the list of received items
  const itemsIterator: Iterator<GItem> = items[Symbol.iterator]();
  let itemsIteratorResult: IteratorResult<GItem>;
  while (!(itemsIteratorResult = itemsIterator.next()).done) {
    const item: GItem = itemsIteratorResult.value;

    // generates the trackBy value
    const trackedBy: any = trackBy(item);

    // list of nodes for this item
    let nodesAndIndex: INodesAndIndex;

    if (previousTrackByMap.has(trackedBy)) { // if the nodes already exists for this trackBy value
      nodesAndIndex = popNodesOfTrackByMap(previousTrackByMap, trackedBy); // removes an entry from previousTrackByMap
    } else {

      // create index source
      const indexSource: ISource<number> = createMulticastReplayLastSource<number>(-1, true);

      // create current nodes from the fragment and the index source
      nodesAndIndex = Object.freeze({
        nodes: getChildNodes(template(item, indexSource.subscribe)),
        index: distinctEmitPipe<number>()(indexSource.emit),
      });
    }

    // append the current nodes into currentTrackByMap
    pushNodesIntoTrackByMap(currentTrackByMap, trackedBy, nodesAndIndex);
    // and into our list of nodes
    nodesAndIndexList.push(nodesAndIndex);
  }

  return {
    currentTrackByMap,
    nodesAndIndexList,
  };
}

/**
 * Detaches all nodes present in 'trackByMap'
 */
function detachNodesOfTrackByMap(
  trackByMap: ITrackByMap,
): void {
  const trackByMapIterator: Iterator<INodesAndIndex[]> = trackByMap.values();
  let trackByMapIteratorResult: IteratorResult<INodesAndIndex[]>;
  while (!(trackByMapIteratorResult = trackByMapIterator.next()).done) {
    const nodeList: INodesAndIndex[] = trackByMapIteratorResult.value;
    for (let i = 0, li = nodeList.length; i < li; i++) {
      const nodes: ITemplateNodeList = nodeList[i].nodes;
      for (let j = 0, lj = nodes.length; j < lj; j++) {
        detachStandardNode(nodes[i]);
        // console.log('detach node', nodes[i]);
      }
    }
  }
}


/**
 * Detaches from the DOM all nodes present in 'trackByMap'
 */
function moveNodesForReactiveForLoopNode(
  nodesAndIndexList: INodesAndIndex[],
  parentNode: ContainerNode | Node,
): void {
  let referenceNode: Node | null = parentNode.firstChild; // the node to replace

  for (let i = 0, l = nodesAndIndexList.length; i < l; i++) {
    const nodesAndIndex: INodesAndIndex = nodesAndIndexList[i];
    nodesAndIndex.index(i);

    const length: number = nodesAndIndex.nodes.length;

    if (length > 0) {
      if (nodesAndIndex.nodes[0] !== referenceNode) {
        moveStandardNodes(nodesAndIndex.nodes, parentNode, referenceNode);
        // console.log('move nodes', nodesAndIndex.nodes);
      }

      referenceNode = nodesAndIndex.nodes[length - 1].nextSibling;
    }
  }
}


function updateNodesForReactiveForLoopNode<GItem>(
  parentNode: Node,
  previousTrackByMap: ITrackByMap,
  template: IReactiveForLoopNodeTemplate<GItem>,
  items: Iterable<GItem>,
  trackBy: IReactiveForLoopNodeTrackByFunction<GItem>,
): ITrackByMap {
  // generate the list of nodes to insert or move from a list of items
  const {
    currentTrackByMap,
    nodesAndIndexList
  }: IGenerateNodesFromItemsReturn = generateNodesForReactiveForLoopNode<GItem>(
    previousTrackByMap,
    template,
    items,
    trackBy,
  );

  // every nodes remaining into previousTrackByMap are nodes that must be removed
  detachNodesOfTrackByMap(previousTrackByMap);

  // refresh DOM
  moveNodesForReactiveForLoopNode(
    nodesAndIndexList,
    parentNode,
  );

  return currentTrackByMap;
}


/*--------*/

export type IReactiveForLoopNodeTemplateArguments<GItem> = [item: GItem, index: ISubscribeFunction<number>];

export type IReactiveForLoopNodeTemplate<GItem> = ITemplate<IReactiveForLoopNodeTemplateArguments<GItem>>;


export interface IReactiveForLoopNodeTrackByFunction<GItem> {
  (item: GItem): any;
}

export interface ICreateReactiveForLoopNodeOptions<GItem> {
  trackBy?: IReactiveForLoopNodeTrackByFunction<GItem>;
}


// const NODE_TO_INDEX_EMITTER_MAP = new WeakMap<Node, IEmitFunction<number>>();

export function createReactiveForLoopNode<GItem, GTrackByValue>(
  subscribe: ISubscribeFunction<Iterable<GItem>>,
  template: IReactiveForLoopNodeTemplate<GItem>,
  {
    trackBy = trackByIdentity,
  }: ICreateReactiveForLoopNodeOptions<GItem> = {},
): Comment {
  const containerNode: ContainerNode = new ContainerNode(`FOR LOOP - ${ uuid() }`, false);

  let previousTrackByMap: ITrackByMap = createTrackByMap();

  subscribeOnNodeConnectedTo<Iterable<GItem>>(containerNode, subscribe, (items: Iterable<GItem>) => {
    // debugger;
    previousTrackByMap = updateNodesForReactiveForLoopNode<GItem>(
      containerNode,
      previousTrackByMap,
      template,
      items,
      trackBy,
    );
  });

  return containerNode;
}




