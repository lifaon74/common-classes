import { of } from '../subscribe-function/from/others/of';
import { pipeSubscribeFunction } from '../functions/piping/pipe-subscribe-function';
import { expression } from '../subscribe-function/from/others/expression';
import { interval } from '../subscribe-function/from/time-related/interval/interval';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function';
import { sourceSubscribePipe } from '../subscribe-function/subscribe-pipe/source-related/source-subscribe-pipe/source-subscribe-pipe';
import { createUnicastReplayLastSource } from '../source/replay-last-source/derived/create-unicast-replay-last-source';
import {
  compileReactiveHTMLAsInjectableTemplate, compileReactiveHTMLAsModule, compileReactiveHTMLAsModuleWithStats
} from './compiler/to-template/compile-reactive-html';
import { nodeAppendChild } from './light-dom/node/move/devired/dom-like/node/node-append-child';
import { createMulticastReplayLastSource } from '../source/replay-last-source/derived/create-multicast-replay-last-source';
import { reactiveFunction } from '../subscribe-function/from/many/reactive-function/reactive-function';
import { mapSubscribePipe } from '../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { currencyFormatter, ILocales, INumberFormatter, numberFormatterSubscribePipe } from './i18n/i18n';
import { compileHTMLAsModule } from './compiler/to-lines/html/compile-html-as-module';
import { noCORS } from '../debug-observables-v5';

async function debugReactiveDOMCompiler1() {

  // const html = `abc`;
  // const html = `{{ data.text }}`;
  // const html = `a {{ data.text }} b`;
  // const html = `<div color="red"></div>`;
  // const html = `<div [title]="data.title">some content</div>`;
  // const html = `<div [attr.id]="data.id"></div>`;
  // const html = `<div [class.class-a]="data.classA"></div>`;
  // const html = `<div [class...]="data.classes"></div>`;
  // const html = `<div [style.font-size]="data.fontSize"></div>`;
  // const html = `<div [style...]="data.style"></div>`;
  // const html = `<div style="width: 500px; height: 500px; background-color: #fafafa" (click)="data.onClick"></div>`;
  // const html = `<div #nodeA></div>`;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-var1
  //     let-var2
  //   >
  //     content
  //   </rx-template>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-text
  //   >
  //     {{ text }}
  //   </rx-template>
  //   <rx-inject-template
  //     template="templateReference"
  //     let-text="data.text"
  //   ></rx-inject-template>
  // `;

  // const html = `
  //   <rx-template name="templateReference">
  //     <div>
  //       I'm visible
  //     </div>
  //   </rx-template>
  //
  //   <button (click)="data.onClick">
  //     toggle
  //   </button>
  //
  //   <rx-if
  //     condition="data.clickCondition"
  //     true="templateReference"
  //   ></rx-if>
  // `;

  // const html = `
  //   <button (click)="data.onClick">
  //     toggle
  //   </button>
  //   <div *if="data.clickCondition">
  //     I'm visible
  //   </div>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-index="i"
  //     let-item="value"
  //   >
  //     <div>
  //      node #{{ i }} -> {{ value }}
  //     </div>
  //   </rx-template>
  //   <rx-for-loop
  //     items="data.items"
  //     template="templateReference"
  //     track-by="data.trackByFn"
  //   ></rx-for-loop>
  // `;

  // const html = `
  //   <div *for="let item of data.items; index as i; trackBy: data.trackByFn">
  //     node #{{ i }} -> {{ item }}
  //   </div>
  // `;

  // const html = `
  //   <div
  //     color="red"
  //     [title]="data.title"
  //     [attr.id]="data.id"
  //     [class.class-a]="data.classA"
  //     [class...]="data.classes"
  //     [style.font-size]="data.fontSize"
  //     [style...]="data.style"
  //   >
  //     a {{ data.text }} b
  //   </div>
  // `;

  // const html = `
  //   <rx-container *if="data.condition">
  //     a {{ data.text }} b
  //   </rx-container>
  // `;

  const html = `
    <rx-container *for="let item of data.items; index as i; trackBy: data.trackByFn">
      node #{{ i }} -> {{ item }}<br>
    </rx-container>
  `;


  // const url = `http://info.cern.ch/hypertext/WWW/TheProject.html`;
  // const url = `https://streams.spec.whatwg.org/`;
  // const url = `https://www.w3.org/TR/2021/WD-css-cascade-5-20210119/`;
  // const html = await (await fetch(noCORS(url))).text();

  function $of<GValue>(value: GValue): ISubscribeFunction<GValue> {
    return pipeSubscribeFunction(of<GValue>(value), [
      sourceSubscribePipe<GValue>(() => createUnicastReplayLastSource<GValue>()),
    ]);
  }

  const timer = interval(1000);

  const clickSource = createMulticastReplayLastSource<boolean>();

  const data = {
    title: $of('my-title'),
    id: expression(() => Math.random(), timer),
    classA: expression(() => Math.random() < 0.5, timer),
    classes: $of(['a', 'b']),
    fontSize: expression(() => Math.floor(Math.random() * 20) + 'px', timer),
    style: $of({ color: 'red' }),
    text: expression(() => new Date().toString(), timer),
    onClick: (event: MouseEvent) => {
      console.log('click');
      clickSource.emit(!clickSource.getValue());
    },
    condition: expression(() => Math.random() < 0.5, timer),
    items: $of([1, 2, 3].map($of)),
    trackByFn: (_: any) => _,
    clickCondition: clickSource.subscribe,
  };
  type GData = typeof data;

  // console.log(compileHTMLAsTemplate(html, new Set()).join('\n'));

  console.time('compilation');
  const template = compileReactiveHTMLAsInjectableTemplate<GData>(html.trim());
  console.timeEnd('compilation');
  console.time('injection');
  const node = template(data);
  nodeAppendChild(document.body, node);
  console.timeEnd('injection');

  // console.time('html-injection');
  // document.body.innerHTML = html;
  // console.timeEnd('html-injection');

  /**
   * The compiled minified version is around 2 times bigger than the html
   */
  await compileReactiveHTMLAsModuleWithStats(html);
}


async function debugReactiveDOMCompiler2() {

  const locales = createMulticastReplayLastSource<ILocales>({ initialValue: navigator.languages });

  const inputValue = createMulticastReplayLastSource<string>();

  const inputValueAsNumber = pipeSubscribeFunction(inputValue.subscribe, [
    mapSubscribePipe<string, number>(Number),
  ]);

  const isInvalid = reactiveFunction((value: number): boolean => {
    return Number.isNaN(value);
  }, [
    inputValueAsNumber,
  ]);

  // const _currencyFormater = pipeSubscribeFunction(locales.subscribe, [
  //   mapSubscribePipe<readonly string[], INumberFormatter>((locales: readonly string[]) => currencyFormatter(locales, {
  //     currency: 'eur',
  //   }))
  // ]);

  const currencyText = pipeSubscribeFunction(inputValueAsNumber, [
    numberFormatterSubscribePipe(locales.subscribe, of({
      style: 'currency',
      currency: 'eur',
    }))
  ]);


  const data = {
    onInputChange(input: HTMLInputElement): void {
      inputValue.emit(input.value);
    },
    inputValue,
    isInvalid,
    currencyText,
    locales,
  };

  const html = `
    <style>
      input {
        border: 1px solid black;
        outline: none;
      }
      input.invalid {
        border-color: red !important;
      }
    </style>
    <input
      #input
      [value]="data.inputValue.subscribe"
      (input)="() => data.onInputChange(input)"
      [class.invalid]="data.isInvalid"
    />
    <div>
      {{ data.currencyText }}
    </div>
    <button (click)="() => data.locales.emit(data.locales.getValue().includes('fr') ? 'en' : 'fr')">
      swap locale
    </button>
  `;

  nodeAppendChild(document.body, compileReactiveHTMLAsInjectableTemplate(html.trim())(data));

  // const module = compileHTMLAsModule(html).join('\n');
  // console.log(await minify(module));
}

async function debugReactiveDOMCompiler3() {

}

/*----*/


export async function debugReactiveDOMCompiler() {

  // await debugReactiveDOMCompiler1();
  await debugReactiveDOMCompiler2();
  // await debugReactiveDOMCompiler3();
}
