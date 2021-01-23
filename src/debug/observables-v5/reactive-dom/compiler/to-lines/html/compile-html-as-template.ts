import { compileHTML } from './compile-html';
import { ILines } from '../compiler.types';
import { generateRXTemplateFunctionLines } from '../dom/rx-component/compilers/rx-template/compile-rx-template';
import { optionalLines } from '../helpers/lines-formating-helpers';
import { IObjectProperties } from '../helpers/generate-object-properties-lines';



export function compileHTMLAsTemplate(
  html: string,
  constantsToImport?: IObjectProperties,
): ILines {
  return generateRXTemplateFunctionLines(
    optionalLines(compileHTML(html)),
    constantsToImport,
  );
}
// import terser from 'https://cdn.skypack.dev/terser';

