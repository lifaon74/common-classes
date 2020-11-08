import { ACTIVABLE_PRIVATE_CONTEXT, IActivablePrivateContext, IActivableStruct, } from '../struct/activable-struct';
import { ImplTraitToggleForActivableStruct, } from '../struct/implementations/activable-struct-toggle-implementation';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTTraitIsActivatedForActivableStruct } from '../struct/implementations/activable-struct-is-activated-implementation';
import { ImplTraitActivateForActivableStruct } from '../struct/implementations/activable-struct-activate-implementation';
import { ImplTraitDeactivateForActivableStruct } from '../struct/implementations/activable-struct-deactivate-implementation';
import { TActivableActivateFunction, TActivableDeactivateFunction } from '../activable-types';


/** CONSTRUCTOR **/

export function ConstructActivable<GReturn>(
  instance: IActivableStruct<GReturn>,
  activate: TActivableActivateFunction<GReturn>,
  deactivate: TActivableDeactivateFunction<GReturn>,
): void {
  CreatePrivateContext<IActivablePrivateContext<GReturn>>(
    ACTIVABLE_PRIVATE_CONTEXT,
    instance,
    {
      isActivated: false,
      activate,
      deactivate,
    },
  );
}

/** CLASS **/

export interface IActivable<GReturn> extends IActivableStruct<GReturn>,
  ImplTTraitIsActivatedForActivableStruct<IActivable<GReturn>>,
  ImplTraitActivateForActivableStruct<IActivable<GReturn>>,
  ImplTraitDeactivateForActivableStruct<IActivable<GReturn>>,
  ImplTraitToggleForActivableStruct<IActivable<GReturn>> {
}


export interface IAssembledActivableImplementations {
  new<GReturn>(): IActivable<GReturn>;
}

export const ActivableImplementationsCollection = [
  ImplTTraitIsActivatedForActivableStruct,
  ImplTraitActivateForActivableStruct,
  ImplTraitDeactivateForActivableStruct,
  ImplTraitToggleForActivableStruct,
];

const AssembledActivableImplementations = AssembleTraitImplementations<IAssembledActivableImplementations>(ActivableImplementationsCollection);

export class Activable<GReturn> extends AssembledActivableImplementations<GReturn> implements IActivable<GReturn> {
  readonly [ACTIVABLE_PRIVATE_CONTEXT]: IActivablePrivateContext<GReturn>;

  constructor(
    activate: TActivableActivateFunction<GReturn>,
    deactivate: TActivableDeactivateFunction<GReturn>,
  ) {
    super();
    ConstructActivable<GReturn>(
      this,
      activate,
      deactivate,
    );
  }
}
