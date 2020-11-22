import {
  ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT, IAdvancedAbortSignalPrivateContext, IAdvancedAbortSignalStruct,
} from '../struct/advanced-abort-signal-struct';
import {
  AssembleTraitImplementations, CallTargetTraitMethodOrDefaultImplementation, CreatePrivateContext,
  TraitEventListenerDispatch
} from '@lifaon/traits';
import {
  TAdvancedAbortSignalCreateFunction, TAdvancedAbortSignalKeyValueTupleUnion
} from '../advanced-abort-signal-types';
import { ImplTraitIsAbortedForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-is-aborted-implementation';
import { ImplTraitGetReasonForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-get-reason-implementation';
import { ConstructEventListener } from '../../../event-listener/raw/class/event-listener-class';
import { ImplTraitEventListenerIsDispatchingForEventListenerStruct } from '../../../event-listener/raw/struct/implementations/event-listener-struct-is-dispatching-implementation';
import { ImplTraitEventListenerOnForEventListenerStruct } from '../../../event-listener/raw/struct/implementations/event-listener-struct-on-implementation';
import { ImplTraitEventListenerDispatchForEventListenerStruct } from '../../../event-listener/raw/struct/implementations/event-listener-struct-dispatch-implementation';
import { ImplTraitToAbortControllerForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-to-abort-controller';
import { ImplTraitWrapPromiseForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-wrap-promise-implementation';
import {
  EVENT_LISTENER_PRIVATE_CONTEXT, IEventListenerPrivateContext
} from '../../../event-listener/raw/struct/event-listener-struct';
import { ImplTraitWrapFetchArgumentsForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-wrap-fetch-arguments-implementation';
import { ImplTraitWrapFunctionForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-wrap-function-implementation';


/** CONSTRUCTOR **/

export function ConstructAdvancedAbortSignal(
  instance: IAdvancedAbortSignalStruct,
  create: TAdvancedAbortSignalCreateFunction,
): void {
  ConstructEventListener<TAdvancedAbortSignalKeyValueTupleUnion>(instance);

  const context: IAdvancedAbortSignalPrivateContext = CreatePrivateContext<IAdvancedAbortSignalPrivateContext>(
    ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT,
    instance,
    {
      isAborted: false,
      reason: void 0,
    },
  );

  if (typeof create === 'function') {
    create((reason: any) => {
      if (context.isAborted) {
        throw new Error(`Already aborted`);
      } else {
        context.isAborted = true;
        context.reason = reason;
        CallTargetTraitMethodOrDefaultImplementation(
          instance,
          TraitEventListenerDispatch,
          'dispatch',
          ['abort', reason],
          ImplTraitEventListenerDispatchForEventListenerStruct
        );
      }
    });
  } else {
    throw new TypeError(`Expected function for argument 'create'.`);
  }
}

/** CLASS **/

export interface IAdvancedAbortSignalImplementations extends
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<IAdvancedAbortSignal>,
  ImplTraitEventListenerOnForEventListenerStruct<IAdvancedAbortSignal, TAdvancedAbortSignalKeyValueTupleUnion>,
  // own implementations

  ImplTraitGetReasonForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitIsAbortedForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitToAbortControllerForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitWrapPromiseForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitWrapFunctionForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitWrapFetchArgumentsForAdvancedAbortSignalStruct<IAdvancedAbortSignal>
  //
{
}

export const AdvancedAbortSignalImplementations = [
  // event listener implementations
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,

  // own implementations
  ImplTraitGetReasonForAdvancedAbortSignalStruct,
  ImplTraitIsAbortedForAdvancedAbortSignalStruct,
  ImplTraitToAbortControllerForAdvancedAbortSignalStruct,
  ImplTraitWrapPromiseForAdvancedAbortSignalStruct,
  ImplTraitWrapFunctionForAdvancedAbortSignalStruct,
  ImplTraitWrapFetchArgumentsForAdvancedAbortSignalStruct,
];

export interface IAdvancedAbortSignalImplementationsConstructor {
  new(): IAdvancedAbortSignalImplementations;
}


export interface IAdvancedAbortSignal extends IAdvancedAbortSignalStruct, IAdvancedAbortSignalImplementations {
}

const AdvancedAbortSignalImplementationsConstructor = AssembleTraitImplementations<IAdvancedAbortSignalImplementationsConstructor>(AdvancedAbortSignalImplementations);

export class AdvancedAbortSignal extends AdvancedAbortSignalImplementationsConstructor implements IAdvancedAbortSignal {
  readonly [EVENT_LISTENER_PRIVATE_CONTEXT]: IEventListenerPrivateContext<TAdvancedAbortSignalKeyValueTupleUnion>;
  readonly [ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT]: IAdvancedAbortSignalPrivateContext;

  constructor(create: TAdvancedAbortSignalCreateFunction) {
    super();
    ConstructAdvancedAbortSignal(this, create);
  }
}
