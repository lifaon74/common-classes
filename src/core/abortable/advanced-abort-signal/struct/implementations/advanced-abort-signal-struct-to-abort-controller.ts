import {
  ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT, TAdvancedAbortSignalPrivateContextFromGSelf, TGenericAdvancedAbortSignalStruct
} from '../advanced-abort-signal-struct';
import { EventListenerOnWithAsyncUnsubscribe, Impl, TraitEventListenerOn, TraitEventListenerIsDispatching, TEventListenerOnUnsubscribeAsync } from '@lifaon/traits';
import { TraitAdvancedAbortSignalToAbortController } from '../../traits/trait-advanced-abort-signal-to-abort-controller';
import { TAdvancedAbortSignalKeyValueTupleUnion } from '../../advanced-abort-signal-types';

export interface IImplTraitToAbortControllerForAdvancedAbortSignalStructGSelfConstraint extends TGenericAdvancedAbortSignalStruct,
  TraitEventListenerOn<any, TAdvancedAbortSignalKeyValueTupleUnion>,
  TraitEventListenerIsDispatching<any> {
}

@Impl()
export class ImplTraitToAbortControllerForAdvancedAbortSignalStruct<GSelf extends IImplTraitToAbortControllerForAdvancedAbortSignalStructGSelfConstraint> extends TraitAdvancedAbortSignalToAbortController<GSelf> {
  toAbortController(this: GSelf): AbortController {
    const context: TAdvancedAbortSignalPrivateContextFromGSelf<GSelf> = this[ADVANCED_ABORT_SIGNAL_PRIVATE_CONTEXT];
    const controller: AbortController = new AbortController();

    if (context.isAborted) {
      controller.abort();
    } else {
      const clear = () => {
        controller.signal.removeEventListener('abort', clear, false);
        unsubscribe();
      };

      const unsubscribe: TEventListenerOnUnsubscribeAsync = EventListenerOnWithAsyncUnsubscribe<TAdvancedAbortSignalKeyValueTupleUnion, 'abort'>(
        this,
        'abort',
        () => {
          clear();
          controller.abort();
        }
      );

      // in the case of controller.signal is aborted, it's no more required to listen to 'abort' from this signal
      controller.signal.addEventListener('abort', clear, false);
    }

    return controller;
  }
}
