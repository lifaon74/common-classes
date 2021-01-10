import { ICompilerReturn } from './compiler-interface';
import { createElement } from '../nodes/element/create-element';
import { INodeCompiler } from './node/node-compiler-interface';
import { compileDefaultElementChildren } from './node/compilers/element/compilers/compile-default-element-children';
import { indentLines, optionalLines } from './snipets';
import { attachNode } from '../dom-mutation/attach-node';
import { setReactiveClass } from '../nodes/element/class/set-reactive-class';
import { createReactiveTextNode } from '../nodes/text/create-reactive-text-node';
import { createStaticTextNode } from '../nodes/text/create-static-text-node';
import { setReactiveStyle } from '../nodes/element/style/set-reactive-style';
import { setReactiveClassList } from '../nodes/element/class/set-reactive-class-list';
import { detachNode } from '../dom-mutation/detach-node';
import { setStaticAttribute } from '../nodes/element/attribute/set-static-attribute';
import { setReactiveStyleList } from '../nodes/element/style/set-reactive-style-list';
import { setReactiveAttribute } from '../nodes/element/attribute/set-reactive-attribute';
import { setReactiveProperty } from '../nodes/element/property/set-reactive-property';
import { createDocumentFragment } from '../nodes/create-document-fragment';


export function compileHTML(
  html: string,
  compiler?: INodeCompiler,
): ICompilerReturn {
  const container: HTMLElement = createElement('div');
  container.innerHTML = html;
  return compileDefaultElementChildren(container, compiler);
}


export const DEFAULT_CONSTANTS_TO_IMPORT = {
  attachNode,
  detachNode,
  createDocumentFragment,
  createStaticTextNode,
  createReactiveTextNode,
  createElement,
  setStaticAttribute,
  setReactiveProperty,
  setReactiveAttribute,
  setReactiveClass,
  setReactiveClassList,
  setReactiveStyle,
  setReactiveStyleList,
};


export const DEFAULT_CONSTANTS_TO_IMPORT_SET = new Set<string>([
  'attachNode',
  'detachNode',
  'createDocumentFragment',
  'createStaticTextNode',
  'createReactiveTextNode',
  'createElement',
  'setStaticAttribute',
  'setReactiveProperty',
  'setReactiveAttribute',
  'setReactiveClass',
  'setReactiveClassList',
  'setReactiveStyle',
  'setReactiveStyleList',
]);



export function compileHTMLAsFunction(
  html: string,
  constantsToImport: Set<string> = DEFAULT_CONSTANTS_TO_IMPORT_SET,
  compiler?: INodeCompiler,
): string[] {
  return [
    `({`,
    ...indentLines(Array.from(constantsToImport).map((name: string) => `${ name },`)),
    `}) => {`,
    ...indentLines([
      `const parentNode = createDocumentFragment();`,
      ...optionalLines(compileHTML(html, compiler)),
      `return parentNode;`,
    ]),
    `}`,
  ];
}

export interface ICompiledHTMLFunction<GConstants extends object> {
  (constantsToImport: GConstants): DocumentFragment;
}

export function compileHTMLAsEvaluatedFunction<GConstants extends object>(
  html: string,
  constantsToImport?: Set<string>,
  compiler?: INodeCompiler,
): ICompiledHTMLFunction<GConstants> {
  return new Function(
    'constantsToImport',
    'return (' + compileHTMLAsFunction(html, constantsToImport, compiler).join('\n') + ')(constantsToImport);'
  ) as ICompiledHTMLFunction<GConstants>;
}
