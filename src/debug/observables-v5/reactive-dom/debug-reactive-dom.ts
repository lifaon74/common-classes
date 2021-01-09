import { pipeSubscribeFunction } from '../misc/helpers/pipe-subscribe-function';
import { mapOperator } from '../operators/map';
import { idle } from '../from/time-related/idle';
import { distinctOperator } from '../operators/distinct';
import { IOperatorFunction } from '../types';
import { interval } from '../from/time-related/interval';
import { replayLastSharedOperator } from '../operators/replay/replay-last/replay-last';
import { attachNode } from './dom-mutation/attach-node';
import { onNodeConnectedTo } from './dom-mutation/on-node-connected-to';
import { ContainerNode } from './nodes/container-node';
import { $timeout } from '../debug-observables-v5';
import { detachNode } from './dom-mutation/detach-node';
import { createReactiveConditionalNode } from './nodes/reactive-conditional-node';
import { nodeAppendChild } from './dom-mutation/devired/node/node-append-child';
import { setReactiveAttribute } from './nodes/element/attribute/set-reactive-attribute';
import { createElementAuto } from './nodes/element/create-element';
import { setReactiveClass } from './nodes/element/class/set-reactive-class';
import { createStaticTextNode } from './nodes/text/create-static-text-node';
import { IReactiveClassListValue, setReactiveClassList } from './nodes/element/class/set-reactive-class-list';
import { createSource } from '../misc/source/create-source';
import { setReactiveProperty } from './nodes/element/property/set-reactive-property';
import { IDynamicStyleValue, setReactiveStyle } from './nodes/element/style/set-reactive-style';
import { IDynamicStyleListValue, setReactiveStyleList } from './nodes/element/style/set-reactive-style-list';
import NumberFormat = Intl.NumberFormat;
import NumberFormatOptions = Intl.NumberFormatOptions;

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
): IOperatorFunction<number, string> {
  return mapOperator<number, string>(currencyFormatter(locales, options));
}


/*---*/

async function debugObservableReactive1() {
  const source1 = pipeSubscribeFunction(idle(), [
    mapOperator<void, string>(() => new Date().toString()),
    // mapOperator<void, string>(() => Date.now().toString()),
    distinctOperator<string>(),
    replayLastSharedOperator<string>(),
  ]);

  const source2 = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, number>(() => Math.floor(Math.random() * 100)),
    currencyOperator(navigator.languages, { currency: 'EUR' }),
    replayLastSharedOperator<string>()
  ]);

  // const text1 = createReactiveTextNode(source1);
  // const text2 = createReactiveTextNode(source2);
  const text1 = createStaticTextNode('abc');

  // onNodeAttachedListener(node)(() => {
  //   console.log('attached');
  // });

  const unsubscribe = onNodeConnectedTo(text1, document.body)((connected: boolean) => {
    console.log('connected', connected);
  });

  // const container1 = document.createElement('span');
  // attachNode(text1, container1, null);
  // attachNode(text2, container1, null);
  //
  // const container2 = document.createElement('div');
  // attachNode(container1, container2, null);
  // console.log('--');
  // attachNode(container2, document.body, null);

  const container3 = document.createDocumentFragment();
  attachNode(text1, container3, null);
  attachNode(container3, document.body, null);

  // unsubscribe();
  // detachNode(node);
  // detachNode(container1);
  // detachNode(container2);
  // detachNode(document.body);
}

async function debugObservableReactive2() {
  const container = new ContainerNode();
  attachNode(createStaticTextNode('a'), container, null);
  attachNode(createStaticTextNode('b'), container, null);
  attachNode(container, document.body, null);
  attachNode(createStaticTextNode('c'), container, null);

  await $timeout(2000);
  detachNode(container);

  await $timeout(2000);
  attachNode(container, document.body, null);
}

async function debugObservableReactive3() {
  let value: boolean = false;
  const source = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, boolean>(() => (value = !value))
  ]);

  const node = createReactiveConditionalNode(source, () => {
    return createStaticTextNode(`Hello world !`);
  });
  nodeAppendChild(document.body, node);
}

async function debugObservableReactive4() {
  const source = pipeSubscribeFunction(idle(), [
    mapOperator<void, string>(() => new Date().toString()),
    replayLastSharedOperator<string>(),
  ]);

  const element = createElementAuto('div');
  nodeAppendChild(document.body, element);
  setReactiveAttribute(source, element, 'attr');
}

async function debugObservableReactive5() {
  let value: boolean = false;
  const source = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, boolean>(() => (value = !value))
  ]);

  const element = createElementAuto('div');
  nodeAppendChild(document.body, element);
  setReactiveClass(source, element, 'some-class');
}

async function debugObservableReactive6() {
  const source = createSource<IReactiveClassListValue>();

  const element = createElementAuto('div');
  nodeAppendChild(document.body, element);
  setReactiveClassList(source.subscribe, element);

  await $timeout(2000);
  source.emit(['a', 'b']);
  await $timeout(1000);
  source.emit({ c: true, b: false });
  await $timeout(1000);
  source.emit('d e');
  await $timeout(1000);
  source.emit(null);
  await $timeout(1000);
}

async function debugObservableReactive7() {
  let value: boolean = false;
  const source = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, boolean>(() => (value = !value))
  ]);

  const element = createElementAuto('input');
  nodeAppendChild(document.body, element);
  setReactiveProperty(source, element, 'disabled');
}

async function debugObservableReactive8() {
  const source = createSource<IDynamicStyleValue>();

  const element = createElementAuto('div');
  nodeAppendChild(document.body, element);
  setReactiveStyle(source.subscribe, element, 'font-size.px');

  await $timeout(2000);
  source.emit(15);
  await $timeout(1000);
  source.emit(null);
  await $timeout(1000);
}

async function debugObservableReactive9() {
  const source = createSource<IDynamicStyleListValue>();

  const element = createElementAuto('div');
  nodeAppendChild(document.body, element);
  setReactiveStyleList(source.subscribe, element);

  await $timeout(2000);
  source.emit({
    'font-size.px': 15,
  });
  await $timeout(1000);
  source.emit([
    ['font-size.px', 20],
  ]);
  await $timeout(1000);
  source.emit('color: red; font-size: 48px;');
  await $timeout(1000);
  source.emit(null);
  await $timeout(1000);
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
  await debugObservableReactive9();
}
