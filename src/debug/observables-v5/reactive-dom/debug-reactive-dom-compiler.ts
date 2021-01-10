import {
  compileHTMLAsEvaluatedFunction, compileHTMLAsFunction, DEFAULT_CONSTANTS_TO_IMPORT, DEFAULT_CONSTANTS_TO_IMPORT_SET
} from './compiler/compile-html';
import { attachNode } from './dom-mutation/attach-node';
import { of } from '../from/others/of';
import { pipeSubscribeFunction } from '../misc/helpers/pipe-subscribe-function';
import { replayLastSharedOperator } from '../operators/replay/replay-last/replay-last';
import { ISubscribeFunction } from '../types';
import { expression } from '../from/others/expression';
import { interval } from '../from/time-related/interval';

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
  };

  // console.log(compileHTMLAsFunction(html).join('\n'));

  const fnc = compileHTMLAsEvaluatedFunction(html, new Set([
    ...DEFAULT_CONSTANTS_TO_IMPORT_SET,
    'data',
  ]));

  const fragment = fnc({
    ...DEFAULT_CONSTANTS_TO_IMPORT,
    data,
  });
  attachNode(fragment, document.body);

}

/*----*/


export async function debugReactiveDOMCompiler() {

  await debugReactiveDOMCompiler1();
}
