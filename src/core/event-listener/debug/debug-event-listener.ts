import { EventListener } from '../class/event-listener-class';

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

  const eventListener = new EventListener<KVMap>();

  // let queue = Promise.resolve();
  //
  // queue = queue
  //   .then(() => {
  //     const undo1 = eventListener.on('event1', () => {
  //       queue = queue.then(undo1);
  //       console.log('event1-1');
  //     });
  //   })
  //   .then(() => {
  //     eventListener.on('event1', () => {
  //       console.log('event1-2');
  //     });
  //   })
  //   .then(() => {
  //     eventListener.dispatch('event1', 1);
  //   });

  // const undo1 = await eventListener.onAsync('event1', async () => {
  //   undo1();
  //   console.log('event1-1');
  // });
  //
  // await eventListener.dispatchAsync('event1', 1);

  console.log('done');
}

export async function debugEventListener() {
  // console.log('debugEventListener');
  //  await debugBrowserEventListener();
  await debugEventListener1();
}

