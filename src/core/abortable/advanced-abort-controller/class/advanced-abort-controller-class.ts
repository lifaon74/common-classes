import {
  ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT, IAdvancedAbortControllerPrivateContext, IAdvancedAbortControllerStruct,
} from '../struct/advanced-abort-controller-struct';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { TAdvancedAbortSignalAbortFunction } from '../../advanced-abort-signal/advanced-abort-signal-types';
import { AdvancedAbortSignal } from '../../advanced-abort-signal/class/advanced-abort-signal-class';
import { ImplTraitAbortForAdvancedAbortControllerStruct } from '../struct/implementations/advanced-abort-controller-struct-abort-implementation';
import { ImplTraitGetSignalForAdvancedAbortControllerStruct } from '../struct/implementations/advanced-abort-controller-struct-get-signal-implementation';
import { AdvancedAbortControllerFromAbortSignals } from './functions/advanced-abort-controller-from-abort-signals';
import { TAbortSignalLikeOrUndefined } from '../advanced-abort-controller-types';

/** CONSTRUCTOR **/

export function ConstructAdvancedAbortController(
  instance: IAdvancedAbortControllerStruct<AdvancedAbortSignal>,
): void {
  let abort!: TAdvancedAbortSignalAbortFunction;
  const signal = new AdvancedAbortSignal((_abort: TAdvancedAbortSignalAbortFunction) => {
    abort = _abort;
  });
  CreatePrivateContext<IAdvancedAbortControllerPrivateContext<AdvancedAbortSignal>>(
    ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT,
    instance,
    {
      signal,
      abort,
    },
  );
}

/** CLASS **/

export interface IAdvancedAbortControllerImplementations extends
  // implementations
  ImplTraitAbortForAdvancedAbortControllerStruct<any>,
  ImplTraitGetSignalForAdvancedAbortControllerStruct<any, AdvancedAbortSignal>
  //
{
}

export const AdvancedAbortControllerImplementations = [
  ImplTraitAbortForAdvancedAbortControllerStruct,
  ImplTraitGetSignalForAdvancedAbortControllerStruct,
];

export interface IAdvancedAbortControllerImplementationsConstructor {
  new(): IAdvancedAbortController;
}



export interface IAdvancedAbortController extends IAdvancedAbortControllerStruct<AdvancedAbortSignal>, IAdvancedAbortControllerImplementations {
}

const AdvancedAbortControllerImplementationsConstructor = AssembleTraitImplementations<IAdvancedAbortControllerImplementationsConstructor>(AdvancedAbortControllerImplementations);

export class AdvancedAbortController extends AdvancedAbortControllerImplementationsConstructor implements IAdvancedAbortController {
  static fromAbortSignals(...signals: TAbortSignalLikeOrUndefined[]): IAdvancedAbortController {
    return AdvancedAbortControllerFromAbortSignals(signals);
  }

  // static timeout(timeout: number, signal?: IAdvancedAbortSignal): IAdvancedAbortController {
  //   return AdvancedAbortControllerTimeout(this, timeout, signal);
  // }

  readonly [ADVANCED_ABORT_CONTROLLER_PRIVATE_CONTEXT]: IAdvancedAbortControllerPrivateContext<AdvancedAbortSignal>;

  constructor() {
    super();
    ConstructAdvancedAbortController(this);
  }
}
