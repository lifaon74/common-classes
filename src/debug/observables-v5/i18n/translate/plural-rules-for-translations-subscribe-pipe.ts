import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ILocales } from '../locales/locales.type';
import { pluralRulesSubscribePipe } from '../plural-rules/plural-rules-subscribe-pipe';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { distinctSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/distinct-subscribe-pipe';
import { pipeSubscribePipeFunctions } from '../../functions/piping/pipe-subscribe-pipe-functions/pipe-subscribe-pipe-functions';
import { IPluralRulesResult, IPluralRulesValue } from '../plural-rules/plural-rules.type';


export function pluralRulesForTranslationsSubscribePipe(
  locales: ISubscribeFunction<ILocales>,
  key: string,
): ISubscribePipeFunction<IPluralRulesValue, string> {
  return pipeSubscribePipeFunctions([
    pluralRulesSubscribePipe(locales),
    mapSubscribePipe<IPluralRulesResult, string>((rule: IPluralRulesResult) => {
      return `${ key }[${ rule }]`;
    }),
    distinctSubscribePipe<string>(),
  ]);
}


