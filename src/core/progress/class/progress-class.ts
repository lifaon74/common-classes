import { IProgressPrivateContext, IProgressStruct, PROGRESS_PRIVATE_CONTEXT, } from '../struct/progress-struct';
import { AssembleTraitImplementations, CreatePrivateContext } from '@lifaon/traits';
import { ImplTraitIsLengthComputableForProgressStruct } from '../struct/implementations/progress-struct-is-length-computable-implementation';
import { ImplTraitGetTotalForProgressStruct } from '../struct/implementations/progress-struct-get-total-implementation';
import { ImplTraitGetLoadedForProgressStruct } from '../struct/implementations/progress-struct-get-loaded-implementation';
import { ImplTraitGetCodeForProgressStruct } from '../struct/implementations/progress-struct-get-code-implementation';
import { TCode } from '../../reason/reason-types';

/** CONSTRUCTOR **/

export function ConstructProgress<GCode extends TCode>(
  instance: IProgressStruct<GCode>,
  loaded?: number,
  total?: number,
  code?: GCode,
): void {
  if (total === void 0) {
    total = Number.POSITIVE_INFINITY;
  } else if (
    (typeof total !== 'number')
    || Number.isNaN(total)
    || (total < 0)
  ) {
    throw new TypeError(`Expected positive number as 'total'`);
  }

  if (loaded === void 0) {
    loaded = 0;
  } else if (
    (typeof loaded !== 'number')
    || Number.isNaN(loaded)
    || (loaded < 0)
    || (loaded > total)
  ) {
    throw new TypeError(`Expected number in the range [0, ${ total } (total)] as 'loaded'`);
  }

  if (code === void 0) {
    code = 'unknown' as unknown as GCode;
  } else if (typeof code !== 'string') {
    throw new TypeError(`Expected string or void as 'code'`);
  }

  CreatePrivateContext<IProgressPrivateContext<GCode>>(
    PROGRESS_PRIVATE_CONTEXT,
    instance,
    {
      loaded,
      total,
      code,
    },
  );
}

/** CLASS **/

export interface IProgressImplementations<GCode extends TCode> extends
  // implementations
  ImplTraitGetCodeForProgressStruct<IProgress<GCode>, GCode>,
  ImplTraitGetLoadedForProgressStruct<IProgress<GCode>>,
  ImplTraitGetTotalForProgressStruct<IProgress<GCode>>,
  ImplTraitIsLengthComputableForProgressStruct<IProgress<GCode>>
  //
{
}

export const ProgressImplementations = [
  ImplTraitGetCodeForProgressStruct,
  ImplTraitGetLoadedForProgressStruct,
  ImplTraitGetTotalForProgressStruct,
  ImplTraitIsLengthComputableForProgressStruct,
];

export interface IProgressImplementationsConstructor {
  new<GCode extends TCode>(): IProgressImplementations<GCode>;
}

export interface IProgress<GCode extends TCode> extends IProgressStruct<GCode>, IProgressImplementations<GCode> {
}

const ProgressImplementationsConstructor = AssembleTraitImplementations<IProgressImplementationsConstructor>(ProgressImplementations);


export interface IProgressStatic {
  fromProgressEvent(
    event: ProgressEvent,
  ): IProgress<string>;

  fromProgressEvent<GCode extends string>(
    event: ProgressEvent,
    code: GCode
  ): IProgress<GCode>;
}

export interface IProgressConstructor extends IProgressStatic {
  new(loaded?: number, total?: number): IProgress<'unknown'>;

  new<GCode extends TCode>(loaded: number, total: number, code: GCode): IProgress<GCode>;
}

export const Progress: IProgressConstructor = class Progress<GCode extends TCode> extends ProgressImplementationsConstructor<GCode> implements IProgress<GCode> {

  static fromProgressEvent(
    event: ProgressEvent,
  ): IProgress<string>;
  static fromProgressEvent<GCode extends string>(
    event: ProgressEvent,
    code: GCode
  ): IProgress<GCode>
  static fromProgressEvent<GCode extends string>(
    event: ProgressEvent,
    code: GCode = event.type as GCode
  ): IProgress<GCode> {
    const total: number = event.lengthComputable
      ? Math.max(0, event.total)
      : Number.POSITIVE_INFINITY;
    return new Progress<GCode>(
      Math.max(0, Math.min(total, event.loaded)),
      total,
      code,
    );
  }

  readonly [PROGRESS_PRIVATE_CONTEXT]: IProgressPrivateContext<GCode>;

  constructor(loaded?: number, total?: number);
  constructor(loaded: number, total: number, code: GCode);
  constructor(loaded?: number, total?: number, code?: GCode) {
    super();
    ConstructProgress<GCode>(this, loaded, total, code);
  }
};
