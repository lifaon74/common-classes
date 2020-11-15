import { EventListener } from '../core/event-listener/raw/class/event-listener-class';
import { TKeyValueMapToKeyValueTupleUnion } from '@lifaon/traits';
import { EventListenerFromEventTarget } from '../core/event-listener/from-event-target/class/event-listener-from-event-target-class';

export async function debugBrowserEventListener() {
  const event1_1 = () => {
    console.log('event1-1');
    document.dispatchEvent(new CustomEvent('event2'));
    document.removeEventListener('event1', event1_2);
    document.addEventListener('event1', event1_4);
  };

  const event1_2 = () => {
    console.log('event1-2');
  };

  const event1_3 = () => {
    console.log('event1-3');
  };

  const event1_4 = () => {
    console.log('event1-4');
  };

  const event2_1 = () => {
    console.log('event2-1');
  };

  document.addEventListener('event1', event1_1);
  document.addEventListener('event1', event1_2);
  document.addEventListener('event1', event1_3);
  document.addEventListener('event2', event2_1);

  console.log('A');
  document.dispatchEvent(new CustomEvent('event1'));
  console.log('B');

  // A
  // event1-1
  // event2-1
  // event1-3
  // B
}

export async function debugEventListener1() {
  interface KVMap {
    'event1': number;
    'event2': string;
  }

  type KVUnion = TKeyValueMapToKeyValueTupleUnion<KVMap>;
  // const a: TInferKeyValueTupleUnionGKey<KVUnion>;
  const eventListener = new EventListener<KVUnion>();

  eventListener
    .once('event1', (value: number) => {
      console.log('event1 once');
    });

  let queue = Promise.resolve();

  queue = queue
    .then(() => {
      const undo1 = eventListener.on('event1', (value: number) => {
        queue = queue
          .then(undo1)
          .then(() => {
            eventListener.dispatch('event1', 2);
          });
        console.log('event1-1', value);
      });
    })
    .then(() => {
      eventListener.on('event1', (value: number) => {
        console.log('event1-2', value);
      });
    })
    .then(() => {
      eventListener.dispatch('event1', 1);
    });

  console.log('done');
}

export async function debugEventListener2() {

  type KVUnion = TKeyValueMapToKeyValueTupleUnion<WindowEventMap>;
  const eventListener = new EventListenerFromEventTarget<KVUnion>(window);

  eventListener
    .once('click', (event: MouseEvent) => {
      console.log(event);
    });

  // eventListener.dispatch('click', new MouseEvent('click'));
}


export async function debugEventListener() {
  // console.log('debugEventListener');
  //  await debugBrowserEventListener();
  // await debugEventListener1();
  await debugEventListener2();
}

