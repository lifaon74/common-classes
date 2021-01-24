import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ILocales } from '../locales.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import NumberFormatOptions = Intl.NumberFormatOptions;
import NumberFormat = Intl.NumberFormat;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import DateTimeFormat = Intl.DateTimeFormat;

export type IDateTimeFormatValue = Date | number;


export function dateTimeFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<DateTimeFormatOptions>,
): ISubscribePipeFunction<IDateTimeFormatValue, string> {
  const format: ISubscribeFunction<DateTimeFormat> = reactiveFunction((locales: ILocales, options: DateTimeFormatOptions): DateTimeFormat => {
    return new Intl.DateTimeFormat(locales as string[], options);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<IDateTimeFormatValue>): ISubscribeFunction<string> => {
    return reactiveFunction((value: IDateTimeFormatValue, format: DateTimeFormat): string => {
      return format.format(value);
    }, [subscribe, format]);
  };
}

