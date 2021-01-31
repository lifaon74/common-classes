import { ISubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { ITranslations } from './translations.type';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { ILocales } from '../locales/locales.type';
import { mergeAllSingleSubscribePipe } from '../../subscribe-function/subscribe-pipe/merge-all/merge-all-single-subscribe-pipe';

export interface ITranslationLoader {
  (locales: ILocales): ISubscribeFunction<ITranslations>;
}

export function createTranslationsLoader(
  locales: ISubscribeFunction<ILocales>,
  load: ITranslationLoader,
): ISubscribeFunction<ITranslations> {
  return pipeSubscribeFunction(locales, [
    mapSubscribePipe<ILocales, ISubscribeFunction<ITranslations>>(load),
    mergeAllSingleSubscribePipe<ITranslations>(),
  ]);
}
