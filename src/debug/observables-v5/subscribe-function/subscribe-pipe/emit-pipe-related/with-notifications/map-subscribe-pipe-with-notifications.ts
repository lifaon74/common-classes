import { IMapFunction, mapEmitPipe } from '../../../../pipes/map-emit-pipe';
import {
  emitPipeToSubscribePipeWithNotifications, IEmitPipeToSubscribePipeEmitPipeInValue,
  IEmitPipeToSubscribePipeWithNotificationsReturn
} from './emit-pipe-to-subscribe-pipe-with-notification';


/**
 * @see mapEmitPipe
 */
export function mapSubscribePipeWithNotifications<GIn, GMapOut>(
  mapFunction: IMapFunction<IEmitPipeToSubscribePipeEmitPipeInValue<GIn>, GMapOut>,
): IEmitPipeToSubscribePipeWithNotificationsReturn<GIn, GMapOut> {
  return emitPipeToSubscribePipeWithNotifications<GIn, GMapOut>(
    mapEmitPipe<IEmitPipeToSubscribePipeEmitPipeInValue<GIn>, GMapOut>(mapFunction),
  );
}

