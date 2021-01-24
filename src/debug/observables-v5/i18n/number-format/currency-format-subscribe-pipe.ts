import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function';
import { ILocales } from '../locales.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function';
import { numberFormatSubscribePipe } from './number-format-subscribe-pipe';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import NumberFormatOptions = Intl.NumberFormatOptions;

export interface ICurrencyFormatOptions extends Omit<NumberFormatOptions, 'style' | 'currency'>, Required<Pick<NumberFormatOptions, 'currency'>> {
}

export function currencyFormatSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  options: ISubscribeFunction<ICurrencyFormatOptions>,
): ISubscribePipeFunction<number, string> {
  return numberFormatSubscribePipe(locales, pipeSubscribeFunction(options, [
    mapSubscribePipe<ICurrencyFormatOptions, NumberFormatOptions>((options: ICurrencyFormatOptions): NumberFormatOptions => {
      return {
        ...options,
        style: 'currency',
      };
    }),
  ]));
}
