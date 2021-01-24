import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ILocales } from '../locales.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import NumberFormatOptions = Intl.NumberFormatOptions;
import NumberFormat = Intl.NumberFormat;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import DateTimeFormat = Intl.DateTimeFormat;

export interface ITranslateOptions {
  [key: string]: any;
}

// export function translateSubscribePipe(
//   locales: ISubscribeFunction<ILocales>,
//   key: ISubscribeFunction<string>,
//   options: ISubscribeFunction<string>,
// ): ISubscribePipeFunction<string, string> {
//   const format: ISubscribeFunction<DateTimeFormat> = reactiveFunction((locales: ILocales, options: DateTimeFormatOptions): DateTimeFormat => {
//     return new Intl.DateTimeFormat(locales as string[], options);
//   }, [locales, options]);
//   return (subscribe: ISubscribeFunction<string>): ISubscribeFunction<string> => {
//     return reactiveFunction((value: string, format: DateTimeFormat): string => {
//       return format.format(value);
//     }, [subscribe, format]);
//   };
// }

