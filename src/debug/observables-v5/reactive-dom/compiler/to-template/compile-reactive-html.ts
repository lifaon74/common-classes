import { compileHTMLAsTemplate } from '../to-lines/html/compile-html-as-template';
import { IHTMLTemplate } from '../../light-dom/template/template.type';
import { IObjectProperties } from '../to-lines/helpers/generate-object-properties-lines';
import {
  DEFAULT_CONSTANTS_TO_IMPORT, generateConstantsToImportForInjectableTemplateFromObject
} from '../misc/default-constants-to-import';
import { convertLinesToTemplate } from './convert-lines-to-template';
import { ITerserMinifyResult, minify } from '../misc/minify';
import { linesToString } from '../to-lines/helpers/lines-formating-helpers';
import { compileHTMLAsModule } from '../to-lines/html/compile-html-as-module';

/**
 * DEBUG FUNCTIONS ONLY
 */

export function compileReactiveHTMLAsTemplate<GTemplateArgument extends object>(
  html: string,
  constantsToImport?: IObjectProperties,
): IHTMLTemplate<GTemplateArgument> {
  // console.log(linesToString(compileHTMLAsTemplate(html, constantsToImport)));
  return convertLinesToTemplate(compileHTMLAsTemplate(html, constantsToImport));
}

/*--------*/


// export function makeTemplateInjectable<GData extends object, GConstants extends object>(
//   template: IHTMLTemplate<GConstants>,
//   constantsToImport: GConstants,
// ): IHTMLTemplate<GData> {
//   return (data: GData): DocumentFragment => {
//     return template({
//       ...constantsToImport,
//       data,
//     });
//   };
// }


export function compileReactiveHTMLAsInjectableTemplate<GData extends object>(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): IHTMLTemplate<GData> {
  const template: IHTMLTemplate<object> = compileReactiveHTMLAsTemplate<object>(
    html,
    generateConstantsToImportForInjectableTemplateFromObject(constantsToImport),
  );

  return (data: GData): DocumentFragment => {
    return template({
      ...constantsToImport,
      data,
    });
  };
}


export const DEFAULT_MINIFY_OPTIONS = {
  module: true,
  compress: { pure_getters: true, passes: 5 },
  mangle: {
    module: true,
    toplevel: true,
  },
  output: {},
  parse: {},
  rename: {},
};


export function compileReactiveHTMLAsModule(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): Promise<string> {
  return minify(linesToString(compileHTMLAsModule(html, generateConstantsToImportForInjectableTemplateFromObject(constantsToImport))), DEFAULT_MINIFY_OPTIONS)
    .then((result: ITerserMinifyResult) => {
      return result.code;
    });
}

export function compileReactiveHTMLAsModuleWithStats(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): Promise<string> {
  const code: string = linesToString(compileHTMLAsModule(html, generateConstantsToImportForInjectableTemplateFromObject(constantsToImport)));
  const percent = (value: number): string => `${ Math.floor(value * 100) }%`;
  return minify(code, DEFAULT_MINIFY_OPTIONS)
    .then((result: ITerserMinifyResult) => {
      return result.code;
    })
    .then((minified: string) => {
      console.log(`- html: ${ html.length }`);
      console.log(`- compiled: ${ code.length } (html: ${ percent(code.length / html.length) })`);
      console.log(`- minified: ${ minified.length } (html: ${ percent(minified.length / html.length) }, compiled: ${ percent(minified.length / code.length) })`);

      return minified;
    });
}
