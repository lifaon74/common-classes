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
import { ImplTraitEventListenerOnceForEventListenerStruct } from '../../../event-listener/raw/struct/implementations/event-listener-struct-once-implementation';
import { ImplTraitToAbortControllerForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-to-abort-controller';
import { ImplTraitWrapPromiseForAdvancedAbortSignalStruct } from '../struct/implementations/advanced-abort-signal-struct-wrap-promise-implementation';


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
          ImplTraitEventListenerDispatchForEventListenerStruct as any // WARN
        );
      }
    });
  } else {
    throw new TypeError(`Expected function for argument 'create'.`);
  }
}

/** CLASS **/

export interface IAdvancedAbortSignal extends IAdvancedAbortSignalStruct,
  ImplTraitEventListenerIsDispatchingForEventListenerStruct<IAdvancedAbortSignal>,
  ImplTraitEventListenerOnForEventListenerStruct<IAdvancedAbortSignal, TAdvancedAbortSignalKeyValueTupleUnion>,
  ImplTraitEventListenerOnceForEventListenerStruct<IAdvancedAbortSignal, TAdvancedAbortSignalKeyValueTupleUnion>,
  ImplTraitGetReasonForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitIsAbortedForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitToAbortControllerForAdvancedAbortSignalStruct<IAdvancedAbortSignal>,
  ImplTraitWrapPromiseForAdvancedAbortSignalStruct<IAdvancedAbortSignal> {
}


export interface IAssembledAdvancedAbortSignalImplementations {
  new(): IAdvancedAbortSignal;
}

export const AdvancedAbortSignalImplementationsCollection = [
  ImplTraitEventListenerIsDispatchingForEventListenerStruct,
  ImplTraitEventListenerOnForEventListenerStruct,
  ImplTraitEventListenerOnceForEventListenerStruct,
  ImplTraitGetReasonForAdvancedAbortSignalStruct,
  ImplTraitIsAbortedForAdvancedAbortSignalStruct,
  ImplTraitToAbortControllerForAdvancedAbortSignalStruct,
  ImplTraitWrapPromiseForAdvancedAbortSignalStruct,
];

const AssembledAdvancedAbortSignalImplementations = AssembleTraitImplementations<IAssembledAdvancedAbortSignalImplementations>(AdvancedAbortSignalImplementationsCollection);

export class AdvancedAbortSignal extends AssembledAdvancedAbortSignalImplementations implements IAdvancedAbortSignal {
  readonly [ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT]: IAdvancedAbortSignalPrivateContext;

  constructor(create: TAdvancedAbortSignalCreateFunction) {
    super();
    ConstructAdvancedAbortSignal(this, create);
  }
}
