import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ILocales } from '../locales.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import NumberFormatOptions = Intl.NumberFormatOptions;
import NumberFormat = Intl.NumberFormat;

export type INumberFormatValue = number | bigint;

export function numberFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<NumberFormatOptions>,
): ISubscribePipeFunction<INumberFormatValue, string> {
  const format: ISubscribeFunction<NumberFormat> = reactiveFunction((locales: ILocales, options: NumberFormatOptions): NumberFormat => {
    return new Intl.NumberFormat(locales as string[], options);
  }, [locales, options]);
  return (subscribe: ISubscribeFunction<INumberFormatValue>): ISubscribeFunction<string> => {
    return reactiveFunction((value: INumberFormatValue, format: NumberFormat): string => {
      return format.format(value);
    }, [subscribe, format]);
  };
}
