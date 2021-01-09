import { pipeSubscribeFunction } from '../misc/helpers/pipe-subscribe-function';
import { mapOperator } from '../operators/map';
import { createReactiveTextNode, createStaticTextNode } from './reactive-text-node';
import { attachNode, detachNode, onNodeAttachedListener, onNodeConnectedTo } from './node-state/dom-state-observer';
import { idle } from '../from/time-related/idle';
import { distinctOperator } from '../operators/distinct';
import { shareOperator } from '../operators/share';
import NumberFormat = Intl.NumberFormat;
import NumberFormatOptions = Intl.NumberFormatOptions;
import { IOperatorFunction } from '../types';
import { of } from '../from/others/of';
import { interval } from '../from/time-related/interval';

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

export function numberFormater(
  locales?: TLocales,
  options?: NumberFormatOptions,
): (value: number) => string {
  const formatter: NumberFormat = new Intl.NumberFormat(normalizeLocales(locales) as string[], options);
  return (value: number): string => {
    return formatter.format(value);
  };
}

export interface ICurrencyFormaterOptions extends Omit<NumberFormatOptions, 'style'> {
  currency: string;
}

export function currencyFormatter(
  locales: TLocales,
  options: ICurrencyFormaterOptions,
): (value: number) => string {
  return numberFormater(locales, {
    ...options,
    style: 'currency',
  });
}

export function currencyOperator(
  locales: TLocales,
  options: ICurrencyFormaterOptions,
): IOperatorFunction<number, string> {
  return mapOperator<number, string>(currencyFormatter(locales, options));
}

/*---*/

/**
 * TODO create an equivalent of the BehaviorSubject and the ReplaySubject
 * https://rxjs-dev.firebaseapp.com/guide/subject
 */

async function debugObservableReactive1() {
  const source1 = pipeSubscribeFunction(idle(), [
    mapOperator<void, string>(() => new Date().toString()),
    // mapOperator<void, string>(() => Date.now().toString()),
    distinctOperator<string>(),
    shareOperator<string>(),
  ]);

  const source2 = pipeSubscribeFunction(interval(1000), [
    mapOperator<void, number>(() => Math.floor(Math.random() * 100)),
    currencyOperator(navigator.languages, { currency: 'EUR' }),
    shareOperator<string>(),
  ]);

  // TODO repeat x last values

  const text1 = createReactiveTextNode(source1);
  const text2 = createReactiveTextNode(source2);
  // const node = createStaticTextNode('abc');

  // onNodeAttachedListener(node)(() => {
  //   console.log('attached');
  // });

  const unsubscribe = onNodeConnectedTo(text1, document.body)((connected: boolean) => {
    console.log('connected', connected);
  });

  const container1 = document.createElement('span');
  attachNode(text1, container1, null);
  attachNode(text2, container1, null);

  const container2 = document.createElement('div');
  attachNode(container1, container2, null);
  console.log('--');
  attachNode(container2, document.body, null);

  // unsubscribe();
  // detachNode(node);
  // detachNode(container1);
  // detachNode(container2);
  // detachNode(document.body);
}

// async function debugObservableReactive2() {
//   let value: boolean = false;
//   const source = pipeSubscribeFunction(interval(1000), [
//     mapOperator<void, boolean>(() => (value = !value))
//   ]);
//
//   const node = createReactiveConditionalNode(source, () => {
//     return new Text(`Hello world !`);
//   });
//   document.body.appendChild(node);
// }

/*----*/


export async function debugReactiveDOM() {
  await debugObservableReactive1();
}
