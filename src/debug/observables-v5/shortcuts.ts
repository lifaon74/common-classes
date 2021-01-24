
/*
Syntax:

name$ => SubscribeFunction
name$$ => () => SubscribeFunction (generator of SubscribeFunction)
name$$$ => ()=> () => SubscribeFunction (generator of generator of SubscribeFunction)

$name => EmitFunction

*/


export { pipeSubscribeFunction as pipe$$ } from './functions/piping/pipe-subscribe-function';
export { fromArray as fromArray$$ } from './subscribe-function/from/iterable/sync/from-array';

