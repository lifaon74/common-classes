
/*
Syntax:
name$$$ => ()=> () => SubscribeFunction (generator of generator of SubscribeFunction)
*/


// export { filterSubscribePipe as filter$$$ } from './emit-pipe-related/filter-subscribe-pipe';
// export { mapSubscribePipe as map$$$ } from './emit-pipe-related/map-subscribe-pipe';
// export { distinctSubscribePipe as distinct$$$ } from './emit-pipe-related/distinct-subscribe-pipe';
// export { emitPipeToSubscribePipe as $$to$$$ } from './emit-pipe-related/emit-pipe-to-subscribe-pipe';

export { filterSubscribePipe as filterSP } from './emit-pipe-related/filter-subscribe-pipe';
export { mapSubscribePipe as mapSP } from './emit-pipe-related/map-subscribe-pipe';
export { distinctSubscribePipe as distinctSP } from './emit-pipe-related/distinct-subscribe-pipe';
export { emitPipeToSubscribePipe as EPtoSP } from './emit-pipe-related/emit-pipe-to-subscribe-pipe';
