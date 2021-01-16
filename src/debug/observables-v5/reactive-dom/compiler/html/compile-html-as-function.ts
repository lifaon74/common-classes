import { INodeCompiler } from '../node/node-compiler-interface';
import { indentLines, optionalLines } from '../snipets';
import { attachStandardNode } from '../../light-dom/node/move/standard/attach-standard-node';
import { detachStandardNode } from '../../light-dom/node/move/standard/detach-standard-node';
import { createDocumentFragment } from '../../light-dom/node/create/create-document-fragment';
import { createTextNode } from '../../light-dom/node/create/create-text-node';
import { createReactiveTextNode } from '../../reactive-dom/text/create-reactive-text-node';
import { createElementNode } from '../../light-dom/node/create/create-element-node';
import { setReactiveProperty } from '../../reactive-dom/element/property/set-reactive-property';
import { setReactiveAttribute } from '../../reactive-dom/element/attribute/set-reactive-attribute';
import { setReactiveClass } from '../../reactive-dom/element/class/set-reactive-class';
import { setReactiveClassList } from '../../reactive-dom/element/class/set-reactive-class-list';
import { setReactiveStyle } from '../../reactive-dom/element/style/set-reactive-style';
import { setReactiveStyleList } from '../../reactive-dom/element/style/set-reactive-style-list';
import { ContainerNode } from '../../light-dom/node/create/container-node/container-node';
import { compileHTML } from './compile-html';
import { setReactiveEventListener } from '../../reactive-dom/element/event-listener/set-reactive-event-listener';
import { ILines } from '../compiler-interface';
import { setAttributeValue } from '../../light-dom/attribute/set-attribute-value';

export const DEFAULT_CONSTANTS_TO_IMPORT = {
  attachStandardNode,
  detachStandardNode,
  createDocumentFragment,
  createTextNode,
  createReactiveTextNode,
  createElement: createElementNode,
  setAttributeValue,
  setReactiveProperty,
  setReactiveAttribute,
  setReactiveClass,
  setReactiveClassList,
  setReactiveStyle,
  setReactiveStyleList,
  setReactiveEventListener,
  ContainerNode,
};
export const DEFAULT_CONSTANTS_TO_IMPORT_SET = new Set<string>(Object.keys(DEFAULT_CONSTANTS_TO_IMPORT));

export function compileHTMLAsFunction(
  html: string,
  constantsToImport: Set<string> = DEFAULT_CONSTANTS_TO_IMPORT_SET,
  compiler?: INodeCompiler,
): ILines {
  return [
    `({`,
    ...indentLines(Array.from(constantsToImport).map((name: string) => `${ name },`)),
    `}) => {`,
    ...indentLines([
      `const parentNode = createDocumentFragment();`,
      ...optionalLines(compileHTML(html)),
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
