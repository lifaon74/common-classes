import { IReasonPrivateContext, IReasonStruct, REASON_PRIVATE_CONTEXT, } from '../struct/reason-struct';
import { AssembleTraitImplementations, CreatePrivateContext, IsObject } from '@lifaon/traits';
import { IReasonOptions, IReasonOptionsWithCode, IReasonOptionsWithoutCode } from '../reason-types';
import { ImplTraitGetCodeForReasonStruct } from '../struct/implementations/reason-struct-get-code-implementation';
import { ImplTraitGetMessageForReasonStruct } from '../struct/implementations/reason-struct-get-message-implementation';
import { ImplTraitGetStackForReasonStruct } from '../struct/implementations/reason-struct-get-stack-implementation';

/** CONSTRUCTOR **/

export function ConstructReason<GCode>(
  instance: IReasonStruct<GCode>,
  options: string | IReasonOptions<GCode>,
  _code?: GCode,
  _stack?: string
): void {
  let message: string;
  let code: GCode;
  let stack: string;

  let _options: IReasonOptions<GCode>;
  if ((options === void 0) || (typeof options === 'string')) {
    _options = {
      message: options,
      code: _code,
      stack: _stack,
    };
  } else if (IsObject(options) && (_code === void 0) && (_stack === void 0)) {
    _options = options;
  } else {
    throw new TypeError(`Expected Reason(object?) or Reason(string?, GCode?, string?)`);
  }

  if (typeof _options.message === 'string') {
    message = _options.message;
  } else {
    throw new TypeError(`Expected string as Reason.options.message`);
  }

  code = ((_options as IReasonOptionsWithCode<GCode>).code === void 0)
    ? 'unknown' as unknown as GCode
    : (_options as IReasonOptionsWithCode<GCode>).code;

  if (_options.stack === void 0) {
    stack = (new Error(message).stack || '').replace('Error', 'Reason');
  } else if (typeof _options.stack === 'string') {
    stack = _options.stack;
  } else {
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

export interface IReason<GCode> extends IReasonStruct<GCode>,
  ImplTraitGetCodeForReasonStruct<IReason<GCode>>,
  ImplTraitGetMessageForReasonStruct<IReason<GCode>>,
  ImplTraitGetStackForReasonStruct<IReason<GCode>> {
}

export interface IAssembledReasonImplementations {
  new<GCode>(): IReason<GCode>;
}

export const ReasonImplementationsCollection = [
  ImplTraitGetCodeForReasonStruct,
  ImplTraitGetMessageForReasonStruct,
  ImplTraitGetStackForReasonStruct,
];

const AssembledReasonImplementations = AssembleTraitImplementations<IAssembledReasonImplementations>(ReasonImplementationsCollection);

export interface IReasonConstructor {
  new(message: string): IReason<'unknown'>;

  new(options: IReasonOptionsWithoutCode): IReason<'unknown'>;

  new<GCode>(message: string, code: GCode, stack?: string): IReason<GCode>;

  new<GCode>(options: IReasonOptionsWithCode<GCode>): IReason<GCode>;
}

export const Reason: IReasonConstructor = class Reason<GCode> extends AssembledReasonImplementations<GCode> implements IReason<GCode> {
  readonly [REASON_PRIVATE_CONTEXT]: IReasonPrivateContext<GCode>;

  constructor(message: string);
  constructor(options: IReasonOptionsWithoutCode);
  constructor(message: string, code: GCode, stack?: string);
  constructor(options: IReasonOptionsWithCode<GCode>);
  constructor(options: string | IReasonOptions<GCode>, code?: GCode, stack?: string) {
    super();
    ConstructReason<GCode>(this, options, code, stack);
  }
};
