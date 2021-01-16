import { of } from '../subscribe-function/from/others/of';
import { pipeSubscribeFunction } from '../functions/piping/pipe-subscribe-function';
import { replayLastSharedOperator } from '../__operators/replay/replay-last/replay-last';
import { expression } from '../subscribe-function/from/others/expression';
import { interval } from '../subscribe-function/from/time-related/interval/interval';
import { compileHTMLAsFunction } from './compiler/html/compile-html-as-function';
import { ISubscribeFunction } from '../types/subscribe-function/subscribe-function';

async function debugReactiveDOMCompiler1() {
  // const html = `abc`;
  // const html = `{{ data.text }}`;
  // const html = `a {{ data.text }} b`;
  // const html = `<div color="red"></div>`;
  // const html = `<div [title]="data.title"></div>`;
  // const html = `<div [attr.id]="data.id"></div>`;
  // const html = `<div [class.class-a]="data.classA"></div>`;
  // const html = `<div [class...]="data.classes"></div>`;
  // const html = `<div [style.font-size]="data.fontSize"></div>`;
  // const html = `<div [style...]="data.style"></div>`;
  // const html = `<div style="width: 500px; height: 500px; background-color: #fafafa" (click)="data.onClick"></div>`;
  // const html = `<container>hello</container>`;
  // const html = `<div *if="condition"></div>`;

  const html = `
    <div
      color="red"
      [title]="data.title"
      [attr.id]="data.id"
      [class.class-a]="data.classA"
      [class...]="data.classes"
      [style.font-size]="data.fontSize"
      [style...]="data.style"
    >
      a {{ data.text }} b
    </div>
  `;

  function $of<GValue>(value: GValue): ISubscribeFunction<GValue> {
    return pipeSubscribeFunction(of<GValue>(value), [
      replayLastSharedOperator<GValue>(),
    ]);
  }

  const timer = interval(2000);

  const data = {
    title: $of('my-title'),
    id: expression(() => Math.random(), timer),
    classA: expression(() => Math.random() < 0.5, timer),
    classes: $of(['a', 'b']),
    fontSize: expression(() => Math.floor(Math.random() * 20) + 'px', timer),
    style: $of({ color: 'red' }),
    text: expression(() => new Date().toString(), timer),
    onClick: (event: MouseEvent) => {
      console.log('click', event);
    },
    condition: expression(() => Math.random() < 0.5, timer),
  };

  console.log(compileHTMLAsFunction(html).join('\n'));

  // const inject = compileTemplateAsInjector(html);
  // inject(document.body, data);
}

/*----*/


export async function debugReactiveDOMCompiler() {

  await debugReactiveDOMCompiler1();
}
