import {
  compileHTMLAsEvaluatedFunction, DEFAULT_CONSTANTS_TO_IMPORT, ICompiledHTMLFunction
} from './compile-html-as-function';
import { attachStandardNode } from '../../light-dom/node/move/standard/attach-standard-node';

export interface ITemplateInjector<GData> {
  (container: Element, data: GData): void;
}

export function compileTemplateAsInjector<GData>(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): ITemplateInjector<GData> {

  const createTemplate: ICompiledHTMLFunction<object> = compileHTMLAsEvaluatedFunction(html, new Set([
    ...Object.keys(constantsToImport),
    'data',
  ]));

  return (container: Element, data: GData): void => {
    attachStandardNode(
      createTemplate({
        ...constantsToImport,
        data,
      }),
      container,
    );
  };
}

