import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { ILocales } from '../../i18n/locales.type';
import NumberFormatOptions = Intl.NumberFormatOptions;
import NumberFormat = Intl.NumberFormat;

export type IGenericLocales = string | Iterable<string> | undefined | null;

export function normalizeLocales(
  locales: IGenericLocales,
): ILocales {
  if (
    (locales === null)
    || (locales === void 0)
  ) {
    return navigator.languages;
  } else if (typeof locales === 'string') {
    return [locales];
  } else {
    return Array.from(locales);
  }
}

/*-------------*/

// https://tc39.es/ecma402/#numberformat-objects

/*-------------*/

export interface INumberFormatter {
  (value: number): string;
}

export function numberFormater(
  locales?: IGenericLocales,
  options?: NumberFormatOptions,
): INumberFormatter {
  const formatter: NumberFormat = new Intl.NumberFormat(normalizeLocales(locales) as string[], options);
  return (value: number): string => {
    return formatter.format(value);
  };
}

export interface ICurrencyFormaterOptions extends Omit<NumberFormatOptions, 'style' | 'currency'>, Required<Pick<NumberFormatOptions, 'currency'>> {
}

export function currencyFormatter(
  locales: IGenericLocales,
  options: ICurrencyFormaterOptions,
): INumberFormatter {
  return numberFormater(locales, {
    ...options,
    style: 'currency',
  });
}


export interface IPercentFormaterOptions extends Omit<NumberFormatOptions, 'style'> {
}

export function percentFormatter(
  locales?: IGenericLocales,
  options?: IPercentFormaterOptions
): INumberFormatter {
  return numberFormater(locales, {
    ...options,
    style: 'percent',
  });
}

export function currencySubscribePipe(
  locales: IGenericLocales,
  options: ICurrencyFormaterOptions,
): ISubscribePipeFunction<number, string> {
  return mapSubscribePipe<number, string>(currencyFormatter(locales, options));
}


/*-------------------*/


// https://angular.io/api/common/CurrencyPipe



export class I18NService {

}


export class NumberFormatService {
  // public readonly locales: ISubscribeFunction<IGenericLocales>;

  constructor(
    locales: ISubscribeFunction<IGenericLocales>
  ) {
    // this.locales = pipeSubscribeFunction(locales, [
    //   mapSubscribePipe<IGenericLocales, ILocales>(normalizeLocales),
    // ]);
  }
}






