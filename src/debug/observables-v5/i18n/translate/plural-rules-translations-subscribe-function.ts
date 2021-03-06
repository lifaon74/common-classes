import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ILocales } from '../locales/locales.type';
import { IPluralRulesValue } from '../plural-rules/plural-rules.type';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { pluralRulesForTranslationsSubscribePipe } from './plural-rules-for-translations-subscribe-pipe';
import { numberFormatSubscribePipe } from '../number-format/number-format-subscribe-pipe/number-format-subscribe-pipe';
import { of } from '../../subscribe-function/from/others/of/of';
import { translateSubscribeFunction } from './translate-subscribe-function';
import { ITranslations } from './translations.type';


export function pluralRulesTranslationsSubscribeFunction(
  locales: ISubscribeFunction<ILocales>,
  translations: ISubscribeFunction<ITranslations>,
  key: string,
  count: ISubscribeFunction<IPluralRulesValue>,
  countKey: string,
): ISubscribeFunction<string> {
  return translateSubscribeFunction(
    translations,
    pipeSubscribeFunction(count, [
      pluralRulesForTranslationsSubscribePipe(locales, key),
    ]),
    of({
      [countKey]: pipeSubscribeFunction(count, [
        numberFormatSubscribePipe(locales),
      ]),
    }),
  );
}


