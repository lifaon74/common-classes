import { ILines } from '../compiler.types';
import { IObjectProperties } from '../helpers/generate-object-properties-lines';
import { compileHTMLAsTemplate } from './compile-html-as-template';


export function compileHTMLAsModule(
  html: string,
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `"use strict";`,
    `export default (`,
    ...compileHTMLAsTemplate(
      html,
      constantsToImport,
    ),
    `);`,
  ];
}
