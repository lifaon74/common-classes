import { pipeSubscribeFunction } from '../functions/piping/pipe-subscribe-function';
import { interval } from '../subscribe-function/from/time-related/interval/interval';
import { attachStandardNode } from './light-dom/node/move/standard/attach-standard-node';
import { onNodeConnectedTo } from './light-dom/node/state/on-node-connected-to';
import { $timeout } from '../debug-observables-v5';
import { detachStandardNode } from './light-dom/node/move/standard/detach-standard-node';
import { createReactiveIfNode } from './reactive-dom/template/reactive-if-node/create-reactive-if-node';
import { nodeAppendChild } from './light-dom/node/move/devired/dom-like/node/node-append-child';
import { createElementNode } from './light-dom/node/create/create-element-node';
import { createTextNode } from './light-dom/node/create/create-text-node';
import { createDocumentFragment } from './light-dom/node/create/create-document-fragment';
import { createReactiveForLoopNode } from './reactive-dom/template/reactive-for-loop-node/create-reactive-for-loop-node';
import { createContainerNode } from './light-dom/node/create/container-node/create-container-node';
import { moveStandardNode } from './light-dom/node/move/standard/move-standard-node';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function';
import { ISubscribePipeFunction } from '../types/subscribe-pipe-function/subscribe-pipe-function';
import { createUnicastReplayLastSource } from '../source/replay-last-source/create-replay-last-source';
import { mapSubscribePipe } from '../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import NumberFormat = Intl.NumberFormat;
import NumberFormatOptions = Intl.NumberFormatOptions;
import { createReactiveTextNode } from './reactive-dom/text/create-reactive-text-node';
import { ISource } from '../source/source';
import { idle } from '../subscribe-function/from/time-related/idle/idle';
import { shareSubscribePipe } from '../subscribe-function/subscribe-pipe/share-subscribe-pipe';
import { filterSubscribePipe } from '../subscribe-function/subscribe-pipe/emit-pipe-related/filter-subscribe-pipe';
import { debounceFrameSubscribePipe } from '../subscribe-function/subscribe-pipe/time-related/debounce-frame-subscribe-pipe';
import { logStateSubscribePipe } from '../subscribe-function/subscribe-pipe/log-state-subscribe-pipe';

/* I18N */

export type TLocales = string | Iterable<string> | undefined | null;

export function normalizeLocales(
  locales: TLocales,
): readonly string[] {
  if (
    (locales === null)
    || (locales === void 0)
  ) {
    return navigator.languages;
  } else if (typeof locales === 'string') {
    return [locales];
  } else {
    return Array.from(locales);
  }
}

export interface INumberFormatter {
  (value: number): string;
}

export function numberFormater(
  locales?: TLocales,
  options?: NumberFormatOptions,
): INumberFormatter {
  const formatter: NumberFormat = new Intl.NumberFormat(normalizeLocales(locales) as string[], options);
  return (value: number): string => {
    return formatter.format(value);
  };
}

export interface ICurrencyFormaterOptions extends Omit<NumberFormatOptions, 'style' | 'currency'>, Required<Pick<NumberFormatOptions, 'currency'>> {
}

export function currencyFormatter(
  locales: TLocales,
  options: ICurrencyFormaterOptions,
): INumberFormatter {
  return numberFormater(locales, {
    ...options,
    style: 'currency',
  });
}


export interface IPercentFormaterOptions extends Omit<NumberFormatOptions, 'style'> {
}

export function percentFormatter(
  locales?: TLocales,
  options?: IPercentFormaterOptions
): INumberFormatter {
  return numberFormater(locales, {
    ...options,
    style: 'percent',
  });
}

export function currencyOperator(
  locales: TLocales,
  options: ICurrencyFormaterOptions,
): ISubscribePipeFunction<number, string> {
  return mapSubscribePipe<number, string>(currencyFormatter(locales, options));
}


/*---*/

// async function debugObservableReactive1() {
//   const source1 = pipeSubscribeFunction(idle(), [
//     mapOperator<IdleDeadline, string>(() => new Date().toString()),
//     // mapOperator<void, string>(() => Date.now().toString()),
//     distinctOperator<string>(),
//     replayLastSharedOperator<string>(),
//   ]);
//
//   const source2 = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, number>(() => Math.floor(Math.random() * 100)),
//     currencyOperator(navigator.languages, { currency: 'EUR' }),
//     replayLastSharedOperator<string>()
//   ]);
//
//   // const text1 = createReactiveTextNode(source1);
//   // const text2 = createReactiveTextNode(source2);
//   const text1 = createTextNode('abc');
//
//   // onNodeAttachedListener(node)(() => {
//   //   console.log('attached');
//   // });
//
//   const unsubscribe = onNodeConnectedTo(text1, document.body)((connected: boolean) => {
//     console.log('connected', connected);
//   });
//
//   // const container1 = document.createElement('span');
//   // attachNode(text1, container1, null);
//   // attachNode(text2, container1, null);
//   //
//   // const container2 = document.createElement('div');
//   // attachNode(container1, container2, null);
//   // console.log('--');
//   // attachNode(container2, document.body, null);
//
//   const container3 = createDocumentFragment();
//   nodeAppendChild(text1, container3);
//   nodeAppendChild(container3, document.body);
//
//   // unsubscribe();
//   // detachNode(node);
//   // detachNode(container1);
//   // detachNode(container2);
//   // detachNode(document.body);
// }
//
// async function debugObservableReactive2() {
//   const container = new ContainerNode();
//   attachStandardNode(createTextNode('a'), container, null);
//   attachStandardNode(createTextNode('b'), container, null);
//   attachStandardNode(container, document.body, null);
//   attachStandardNode(createTextNode('c'), container, null);
//
//   await $timeout(2000);
//   detachStandardNode(container);
//
//   await $timeout(2000);
//   attachStandardNode(container, document.body, null);
// }
//
//
// async function debugObservableReactive4() {
//   const source = pipeSubscribeFunction(idle(), [
//     mapOperator<IdleDeadline, string>(() => new Date().toString()),
//     replayLastSharedOperator<string>(),
//   ]);
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveAttribute(source, element, 'attr');
// }
//
// async function debugObservableReactive5() {
//   let value: boolean = false;
//   const source = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, boolean>(() => (value = !value))
//   ]);
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveClass(source, element, 'some-class');
// }
//
// async function debugObservableReactive6() {
//   const source = createMulticastSource<IReactiveClassListValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveClassList(source.subscribe, element);
//
//   await $timeout(2000);
//   source.emit(['a', 'b']);
//   await $timeout(1000);
//   source.emit({ c: true, b: false });
//   await $timeout(1000);
//   source.emit('d e');
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive7() {
//   let value: boolean = false;
//   const source = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, boolean>(() => (value = !value))
//   ]);
//
//   const element = createElementAuto('input');
//   nodeAppendChild(document.body, element);
//   setReactiveProperty(source, element, 'disabled');
// }
//
// async function debugObservableReactive8() {
//   const source = createMulticastSource<IDynamicStyleValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveStyle(source.subscribe, element, 'font-size.px');
//
//   await $timeout(2000);
//   source.emit(15);
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive9() {
//   const source = createMulticastSource<IDynamicStyleListValue>();
//
//   const element = createElementAuto('div');
//   nodeAppendChild(document.body, element);
//   setReactiveStyleList(source.subscribe, element);
//
//   await $timeout(2000);
//   source.emit({
//     'font-size.px': 15,
//   });
//   await $timeout(1000);
//   source.emit([
//     ['font-size.px', 20],
//   ]);
//   await $timeout(1000);
//   source.emit('color: red; font-size: 48px;');
//   await $timeout(1000);
//   source.emit(null);
//   await $timeout(1000);
// }
//
// async function debugObservableReactive10() {
//   const element = createElementAuto('div');
//   element.style.width = '500px';
//   element.style.height = '500px';
//   element.style.backgroundColor = '#fafafa';
//   nodeAppendChild(document.body, element);
//
//   setReactiveEventListener<'click', MouseEvent>((event: MouseEvent) => {
//     console.log(event);
//   }, element, 'click');
// }


/*---*/

async function debugOnNodeConnectedTo1() {
  const text1 = createTextNode('abc');
  const text2 = createTextNode('123');
  const container1 = createElementNode('span');
  const container2 = createElementNode('div');
  const container3 = createElementNode('a');

  onNodeConnectedTo(text1, document.body)((connected: boolean) => {
    console.log('connected', connected);
  });


  const steps = [
    () => attachStandardNode(text1, document.body),
    () => detachStandardNode(text1),
    () => attachStandardNode(text1, document.body),
    // () => attachStandardNode(text1, container1),
    // () => attachStandardNode(text2, container1),
    // () => attachStandardNode(container1, container2),
    // () => attachStandardNode(container2, document.body),
    // () => detachStandardNode(container1),
    // () => attachStandardNode(container1, container2),
    // () => attachStandardNode(container3, document.body),
    // () => moveStandardNode(text1, container3),
  ];


  steps.forEach((step, index: number) => {
    console.warn('step', index, step.toString());
    step();
  });

}


async function debugContainerNode1() {
  const container = createContainerNode();
  attachStandardNode(createTextNode('a'), container);
  attachStandardNode(createTextNode('b'), container);
  attachStandardNode(container, document.body);
  attachStandardNode(createTextNode('c'), container);

  // await $timeout(2000);
  // detachStandardNode(container);
  //
  // await $timeout(2000);
  // attachStandardNode(container, document.body);

  await $timeout(2000);
  moveStandardNode(container, document.body, document.body.firstChild);
}

async function debugReactiveIfNode1() {
  let value: boolean = false;
  const source = pipeSubscribeFunction(interval(1000), [
    mapSubscribePipe<void, boolean>(() => (value = !value))
  ]);

  // const node = createReactiveConditionalNode(source, () => {
  //   return createStaticTextNode(`Hello world !`);
  // });

  const node = createReactiveIfNode(source, () => {
    console.log('create fragment');
    const fragment = createDocumentFragment();
    attachStandardNode(createTextNode(`Hello world !`), fragment);
    attachStandardNode(createTextNode(` => second`), fragment);
    return fragment;
  });

  // const node = createReactiveConditionalNodeStatic(source, createStaticTextNode(`Hello world !`));
  nodeAppendChild(document.body, node);
}

async function debugReactiveForLoopNode1() {
  const source = createUnicastReplayLastSource<number[]>([]);


  const node = createReactiveForLoopNode(source.subscribe, (value: number, index: ISubscribeFunction<number>) => {
    // console.log('create fragment');
    const fragment = createDocumentFragment();
    const container = createElementNode('div');
    attachStandardNode(createTextNode(`node: ${ value } - `), container);
    attachStandardNode(createReactiveTextNode(pipeSubscribeFunction(index, [mapSubscribePipe<number, string>(String)])), container);
    attachStandardNode(container, fragment);
    return fragment;
  });


  // const frame = (cb: () => void) => cb();
  const frame = requestAnimationFrame;

  // nodeAppendChild(document.body, node);

  // source.emit([1, 2, 3]);
  // console.warn('-----');
  // source.emit([1, 2, 3, 4]);
  // console.warn('-----');
  // source.emit([3, 2, 1]);
  // console.warn('-----');


  source.emit(Array.from({ length: 1e4 }, (v: any, index: number) => index));

  // nodeAppendChild(document.body, node);
  // detachStandardNode(node);

  frame(() => {
    console.time('nodeAppendChild');
    nodeAppendChild(document.body, node);
    console.timeEnd('nodeAppendChild');
  });

  // nodeAppendChild(document.body, node);
  // frame(() => {
  //   console.time('nodeAppendChild');
  //   source.emit(Array.from({ length: 1e4 }, (v: any, index: number) => index)); // 800~1000
  //   console.timeEnd('nodeAppendChild');
  // });

  // frame(() => {
  //   console.time('nodeAppendChildFast');
  //   const data: number[] = source.getValue();
  //   for (let i = 0, l = data.length; i < l; i++) {
  //     const container = createElementNode('div');
  //     container.appendChild(createTextNode(`node: ${ data[i] } - ${ i }`));
  //     document.body.appendChild(container);
  //   }
  //   console.timeEnd('nodeAppendChildFast');
  // });

  // console.time('nodeAppendChildFaster');
  // frame(() => {
  //   const fragment = createDocumentFragment();
  //   const data: number[] = source.getValue();
  //
  //   for (let i = 0, l = data.length; i < l; i++) {
  //     const container = createElementNode('div');
  //     container.appendChild(createTextNode(`node: ${ data[i] } - ${ i }`));
  //     fragment.appendChild(container);
  //   }
  //
  //   document.body.appendChild(fragment);
  //   console.timeEnd('nodeAppendChildFaster');
  // });

}

async function debugReactiveForLoopNode2() {
  const items = createUnicastReplayLastSource<ISubscribeFunction<string>[]>([]);





  const date = pipeSubscribeFunction(interval(100), [
    logStateSubscribePipe<void>('interval'),
    // debounceFrameSubscribePipe<void>(),
    // filterSubscribePipe<IdleDeadline, IdleDeadline>((deadline: IdleDeadline): deadline is IdleDeadline => !deadline.didTimeout),
    mapSubscribePipe<void, string>(() => new Date().toString()),
    // shareSubscribePipe<string>(),
  ]);

  // const node = createReactiveForLoopNode(items.subscribe, (value: ISubscribeFunction<string>, index: ISubscribeFunction<number>) => {
  //   const fragment = createDocumentFragment();
  //   const container = createElementNode('div');
  //   attachStandardNode(createReactiveTextNode(value), container);
  //   attachStandardNode(container, fragment);
  //   return fragment;
  // });

  const node = createReactiveTextNode(date);


  items.emit(Array.from({ length: 1e4 }, (v: any, index: number) => date));

  nodeAppendChild(document.body, node);
  detachStandardNode(node);
  // setTimeout(() => {
  //   detachStandardNode(node);
  // }, 5000);
}



/*----*/


export async function debugReactiveDOM() {
  // await debugObservableReactive1();
  // await debugObservableReactive2();
  // await debugObservableReactive3();
  // await debugObservableReactive4();
  // await debugObservableReactive5();
  // await debugObservableReactive6();
  // await debugObservableReactive7();
  // await debugObservableReactive8();
  // await debugObservableReactive9();
  // await debugObservableReactive10();

  await debugOnNodeConnectedTo1();

  // await debugContainerNode1();

  // await debugReactiveIfNode1();
  // await debugReactiveForLoopNode1();
  // await debugReactiveForLoopNode2();

  // await debugReactiveDOMCompiler();
}
