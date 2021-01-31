import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { reactiveFunction } from '../../../subscribe-function/from/many/reactive-function/reactive-function';
import { IDateTimeFormatOptions, IDateTimeFormatValue } from '../date-time-format.type';
import { ILocales } from '../../locales/locales.type';
import DateTimeFormat = Intl.DateTimeFormat;
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export function dateTimeFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<IDateTimeFormatOptions>,
): ISubscribePipeFunction<IDateTimeFormatValue, string> {
  const format: ISubscribeFunction<DateTimeFormat> = reactiveFunction((locales: ILocales, options: IDateTimeFormatOptions): DateTimeFormat => {
    return new Intl.DateTimeFormat(locales as any, options as DateTimeFormatOptions);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<IDateTimeFormatValue>): ISubscribeFunction<string> => {
    return reactiveFunction((value: IDateTimeFormatValue, format: DateTimeFormat): string => {
      return format.format(value);
    }, [subscribe, format]);
  };
}



