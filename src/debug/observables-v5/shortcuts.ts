
/*
Syntax V1:

name$ => SubscribeFunction
name$$ => () => SubscribeFunction (generator of SubscribeFunction)
name$$$ => ()=> () => SubscribeFunction (generator of generator of SubscribeFunction)

$name => EmitFunction

Syntax V2:

- SubscribeFunction -> SF
- SubscribePipe -> SP
- EmitFunction -> EF
- EmitPipe -> EP


*/


// export { pipeSubscribeFunction as pipe$$ } from './functions/piping/pipe-subscribe-function';
// export { fromArray as fromArray$$ } from './subscribe-function/from/iterable/sync/from-array';

export { pipeSubscribeFunction as pipeSF } from './functions/piping/pipe-subscribe-function/pipe-subscribe-function';

