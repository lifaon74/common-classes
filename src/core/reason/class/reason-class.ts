import { IReasonPrivateContext, IReasonStruct, REASON_PRIVATE_CONTEXT, } from '../struct/reason-struct';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitGetCodeForReasonStruct } from '../struct/implementations/reason-struct-get-code-implementation';
import { ImplTraitGetMessageForReasonStruct } from '../struct/implementations/reason-struct-get-message-implementation';
import { ImplTraitGetStackForReasonStruct } from '../struct/implementations/reason-struct-get-stack-implementation';
import { TCode } from '../reason-types';

/** CONSTRUCTOR **/

export function ConstructReason<GCode extends TCode>(
  instance: IReasonStruct<GCode>,
  message: string,
  code?: GCode,
  stack?: string
): void {


  if (typeof message !== 'string') {
    throw new TypeError(`Expected string as 'message'`);
  }

  if (code === void 0) {
    code = 'unknown' as unknown as GCode;
  } else if (typeof code !== 'string') {
    throw new TypeError(`Expected string or void as 'code'`);
  }

  if (stack === void 0) {
    stack = (new Error(message).stack || '').replace('Error', 'Reason');
  } else if (typeof stack !== 'string') {
    throw new TypeError(`Expected string or void as Reason.options.stack`);
  }

  CreatePrivateContext<IReasonPrivateContext<GCode>>(
    REASON_PRIVATE_CONTEXT,
    instance,
    {
      message,
      code,
      stack,
    },
  );
}

/** CLASS **/

export interface IReasonImplementations<GCode extends TCode> extends
  // implementations
  ImplTraitGetCodeForReasonStruct<IReason<GCode>, GCode>,
  ImplTraitGetMessageForReasonStruct<IReason<GCode>>,
  ImplTraitGetStackForReasonStruct<IReason<GCode>>
  //
{
}

export const ReasonImplementations = [
  ImplTraitGetCodeForReasonStruct,
  ImplTraitGetMessageForReasonStruct,
  ImplTraitGetStackForReasonStruct,
];

export interface IReasonImplementationsConstructor {
  new<GCode extends TCode>(): IReasonImplementations<GCode>;
}

export interface IReason<GCode extends TCode> extends IReasonStruct<GCode>, IReasonImplementations<GCode> {
}

const ReasonImplementationsConstructor = AssembleTraitImplementations<IReasonImplementationsConstructor>(ReasonImplementations);

export interface IReasonConstructor {
  new(message: string): IReason<'unknown'>;

  new<GCode extends TCode>(message: string, code: GCode, stack?: string): IReason<GCode>;
}

export const Reason: IReasonConstructor = class Reason<GCode extends TCode> extends ReasonImplementationsConstructor<GCode> implements IReason<GCode> {
  readonly [REASON_PRIVATE_CONTEXT]: IReasonPrivateContext<GCode>;

  constructor(message: string);
  constructor(message: string, code: GCode, stack?: string);
  constructor(message: string, code?: GCode, stack?: string) {
    super();
    ConstructReason<GCode>(this, message, code, stack);
  }
};
