import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { of } from '../../subscribe-function/from/others/of';
import { ITranslations } from './translations.type';

export interface ITranslateOptions {
  [key: string]: any;
}

export function translateSubscribeFunction(
  translations: ISubscribeFunction<ITranslations>,
  key: ISubscribeFunction<string>,
  options: ISubscribeFunction<ITranslateOptions> = of({}),
): ISubscribeFunction<string> {
  return reactiveFunction(
    translate,
    [translations, key, options],
  );
}


const TRANSLATE_VARIABLE_PATTERN: string = '{{(.*?)}}';
const TRANSLATE_VARIABLE_REGEXP: RegExp = new RegExp(TRANSLATE_VARIABLE_PATTERN, 'g');

/**
 * Replace everything inside {{ }} with a variable
 */
export function translate(
  translations: ITranslations,
  key: string,
  options: ITranslateOptions = {},
): string {
  if (translations.has(key)) {
    TRANSLATE_VARIABLE_REGEXP.lastIndex = 0;
    return (translations.get(key) as string).replace(TRANSLATE_VARIABLE_REGEXP, (substring: string, variableName: string): string => {
      return (variableName in options)
        ? String(options[variableName])
        : substring;
    });
  } else {
    return key;
  }
}

