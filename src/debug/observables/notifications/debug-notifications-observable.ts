import { TInferKeyValueTupleGKey, TInferKeyValueTupleGValue, TKeyValueMapToKeyValueTupleUnion } from '@lifaon/traits';
import {
  INotificationsObservable, NotificationsObservable
} from '../../../core/observables/notifications/core/notification-observable/class/notifications-observable-class';
import {
  TInferNotificationsObserversFromKeyValueTupleUnion, TNotificationsObservableEmitFunction
} from '../../../core/observables/notifications/core/notification-observable/notifications-observable-types';
import {
  ITypedEventTarget, TGenericEventKeyValueTupleUnion, TTypedEventListener
} from '../../../core/event-listener/from-event-target/event-target-types';
import { NotificationsObserver } from '../../../core/observables/notifications/core/notifications-observer/class/notifications-observer-class';
import { Observer } from '../../../core/observables/core/observer/built-in/default/class/observer-class';
import { INotificationLike } from '../../../core/notification/notification-types';

export class EventsObservable<GKeyValueTupleUnion extends TGenericEventKeyValueTupleUnion> extends NotificationsObservable<GKeyValueTupleUnion> {
  constructor(
    eventTarget: ITypedEventTarget<GKeyValueTupleUnion>
  ) {
    type GNameUnion = TInferKeyValueTupleGKey<GKeyValueTupleUnion>;
    type GValueUnion = TInferKeyValueTupleGValue<GKeyValueTupleUnion>;
    // type GListeners = (value: GValueUnion) => void;
    type GListeners = TTypedEventListener<GValueUnion>;

    interface Listener {
      listener: GListeners;
      count: number;
    }

    super((
      emit: TNotificationsObservableEmitFunction<GKeyValueTupleUnion>,
      observable: INotificationsObservable<GKeyValueTupleUnion>
    ) => {
      const listeners: Map<GNameUnion, Listener> = new Map<GNameUnion, Listener>();

      observable.on<'add-observer'>('add-observer', (observer: TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>) => {
        const name: GNameUnion = observer.getName() as GNameUnion;
        if (listeners.has(name)) {
          (listeners.get(name) as Listener).count++;
        } else {
          const listener: GListeners = (value: GValueUnion) => {
            emit(name, value);
          };
          eventTarget.addEventListener(name, listener as any);
          listeners.set(name, { listener, count: 1 });
        }
      });

      observable.on<'remove-observer'>('remove-observer', (observer: TInferNotificationsObserversFromKeyValueTupleUnion<GKeyValueTupleUnion>) => {
        const name: GNameUnion = observer.getName() as GNameUnion;
        if (listeners.has(name)) {
          const listener: Listener = listeners.get(name) as Listener;
          listener.count--;
          if (listener.count === 0) {
            eventTarget.removeEventListener(name, listener.listener as any);
            listeners.delete(name);
          }
        }
      });
    });
  }
}

export async function debugNotificationObservable() {

  type KVUnion = TKeyValueMapToKeyValueTupleUnion<WindowEventMap>;

  const observable = new EventsObservable<KVUnion>(window);

  const observer1 = new NotificationsObserver('click', (event: MouseEvent) => {
    console.log('observer1', event);
  });

  const observer2 = new NotificationsObserver('click', (event: MouseEvent) => {
    console.log('observer2', event);
  });

  const observer3 = new NotificationsObserver('mousemove', (event: MouseEvent) => {
    console.log('observer3', event);
  });

  const observer4 = new Observer((notification: INotificationLike<'click', MouseEvent>) => {
    console.log('observer4', notification);
  });


  observable.addObserver(observer1);
  observable.addObserver(observer2);
  observable.addObserver(observer3);
  // observable.addObserver(observer4);

  setTimeout(() => {
    observable.removeObserver(observer2);
    observable.removeObserver(observer3);
    setTimeout(() => {
      observable.removeObserver(observer1);
    }, 2000);
  }, 2000);
}

