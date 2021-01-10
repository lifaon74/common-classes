import { compileNode } from './compiler/node/compile-node';
import { ICompilerReturn } from './compiler/compiler-interface';

async function debugReactiveDOMCompiler1() {
  // const html = `abc`;
  // const html = `{{ data.text }}`;
  // const html = `a {{ data.text }} b`;
  // const html = `<div color="red"></div>`;
  // const html = `<div [color]="data.color"></div>`;
  // const html = `<div [attr.color]="data.color"></div>`;
  // const html = `<div [class.class-a]="data.classEnabled"></div>`;
  // const html = `<div [class...]="data.classes"></div>`;
  // const html = `<div [style.font-size]="data.fontSize"></div>`;
  // const html = `<div [style...]="data.style"></div>`;


  const html = `
    <div
      color="red"
      [color]="data.color"
      [attr.color]="data.color"
      [class.class-a]="data.classEnabled"
      [class...]="data.classes
      [style.font-size]="data.fontSize"
      [style...]="data.style"
    >
      a {{ data.text }} b
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;

  const lines: ICompilerReturn = compileNode(container);

  console.log(lines === null ? null : lines.join('\n'));

}

/*----*/


export async function debugReactiveDOMCompiler() {

  await debugReactiveDOMCompiler1();
}
