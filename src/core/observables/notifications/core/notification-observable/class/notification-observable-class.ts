import {
  INotificationObservablePrivateContext, INotificationObservableStruct, NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
} from '../struct/notification-observable-struct';
import { ImplTraitAddObserverForNotificationObservableStruct } from '../struct/implementations/notification-observable-struct-add-observer-implementation';
import {
  ConstructObservable, IObservable, ObservableImplementationsCollection,
} from '../../../../core/observable/class/observable-class';
import {
  TInferNotificationObserversFromEventMap, TNotificationObservableCreateFunction,
} from '../notification-observable-types';
import {
  AssembleTraitImplementations, CreatePrivateContext, OverrideTraitImplementations, TGenericEventMap, TInferEventMapKeys
} from '@lifaon/traits';


/** CONSTRUCTOR **/

export function ConstructNotificationObservable<GEventMap extends TGenericEventMap>(
  instance: INotificationObservable<GEventMap>,
  create?: TNotificationObservableCreateFunction<GEventMap>,
): void {
  ConstructObservable<TInferNotificationObserversFromEventMap<GEventMap>>(instance, create);

  CreatePrivateContext<INotificationObservablePrivateContext<GEventMap>>(
    NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT,
    instance,
    {
      observersMap: new Map<TInferEventMapKeys<GEventMap>, TInferNotificationObserversFromEventMap<GEventMap>[]>(),
    },
  );
}

/** CLASS **/

export interface INotificationObservable<GEventMap extends TGenericEventMap> extends INotificationObservableStruct<GEventMap>,
  ImplTraitAddObserverForNotificationObservableStruct<INotificationObservable<GEventMap>>,
  Omit<IObservable<TInferNotificationObserversFromEventMap<GEventMap>>, 'addObserver'> { // TODO create a type to handle this case
}

export interface IAssembledNotificationObservableImplementations {
  new<GEventMap extends TGenericEventMap>(): INotificationObservable<GEventMap>;
}

export const NotificationObservableImplementationsCollection = OverrideTraitImplementations(ObservableImplementationsCollection, [
  ImplTraitAddObserverForNotificationObservableStruct,
]);

const AssembledNotificationObservableImplementations = AssembleTraitImplementations<IAssembledNotificationObservableImplementations>(NotificationObservableImplementationsCollection);


export class NotificationObservable<GEventMap extends TGenericEventMap> extends AssembledNotificationObservableImplementations<GEventMap> implements INotificationObservable<GEventMap> {
  readonly [NOTIFICATION_OBSERVABLE_PRIVATE_CONTEXT]: INotificationObservablePrivateContext<GEventMap>;

  constructor(
    create?: TNotificationObservableCreateFunction<GEventMap>,
  ) {
    super();
    ConstructNotificationObservable<GEventMap>(this, create);
  }
}
