import { SameLength } from './shared-types';

export type UnaryFunction<GIn, GOut> = (value: GIn) => GOut;

export type GenericUnaryFunction = UnaryFunction<any, any>;


export type PipeFirstArgRaw<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  GFunctions extends [infer GFirst, ...infer GRest]
    ? (
      GFirst extends ((value: infer GFirstArg) => any)
        ? GFirstArg
        : never
      )
    : never;

export type PipeFirstArg<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  GFunctions extends []
    ? unknown
    : PipeFirstArgRaw<GFunctions, GUnaryFunction>;


export type PipeLastReturnRaw<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  GFunctions extends [...infer GRest, infer GLast]
    ? (
      GLast extends ((value: any) => infer GFirstReturn)
        ? GFirstReturn
        : never
      )
    : never;

export type PipeLastReturnOrValue<GFunctions extends readonly GUnaryFunction[], GValue, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  GFunctions extends []
    ? GValue
    : PipeLastReturnRaw<GFunctions, GUnaryFunction>;

export type PipeLastReturn<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  PipeLastReturnOrValue<GFunctions, unknown, GUnaryFunction>;

export type PipeNowReturn<GValue, GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  PipeLastReturnOrValue<GFunctions, GValue, GUnaryFunction>;


export type PipeReturnRaw<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  (value: PipeFirstArgRaw<GFunctions, GUnaryFunction>) => PipeLastReturnRaw<GFunctions, GUnaryFunction>;

export type PipeReturn<GFunctions extends readonly GUnaryFunction[], GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  GFunctions extends []
    ? <GValue>(value: GValue) => GValue
    : PipeReturnRaw<GFunctions, GUnaryFunction>;


export type PipeConstraint<GFunctions extends readonly GUnaryFunction[], GFirstArg = any, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction> =
  [GFunctions] extends [[]]
    ? []
    : (
      [GFunctions] extends [[infer GFirst, ...infer GRest]]
        ? (
          GFirst extends ((value: GFirstArg) => infer GFirstReturn)
            ? (
              GRest extends GUnaryFunction[]
                ? [any, ...PipeConstraint<GRest, GFirstReturn, GUnaryFunction>]
                : [(value: GFirstArg) => any, ...SameLength<GRest>]
              )
            : [(value: GFirstArg) => any, ...SameLength<GRest>]
          )
        : never[]
      );


export function pipe<GFunctions extends PipeConstraint<GFunctions, any, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
  fns: GFunctions
): PipeReturn<GFunctions, GUnaryFunction> {
  return ((firstArg: unknown): unknown => {
    return (fns as GUnaryFunction[]).reduce((value: any, fnc: GUnaryFunction) => fnc(value), firstArg);
  }) as PipeReturn<GFunctions, GUnaryFunction>;
}

export function pipeNow<GValue, GFunctions extends PipeConstraint<GFunctions, GValue, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
  value: GValue,
  fns: GFunctions
): PipeNowReturn<GValue, GFunctions, GUnaryFunction> {
  return pipe<GFunctions, GUnaryFunction>(fns)(value as never) as PipeNowReturn<GValue, GFunctions, GUnaryFunction>;
}

export function pipeSpread<GFunctions extends PipeConstraint<GFunctions, any, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
  ...fns: GFunctions
): PipeReturn<GFunctions, GUnaryFunction> {
  return pipe<GFunctions, GUnaryFunction>(fns);
}

export function pipeNowSpread<GValue, GFunctions extends PipeConstraint<GFunctions, GValue, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
  value: GValue,
  ...fns: GFunctions
): PipeNowReturn<GValue, GFunctions, GUnaryFunction> {
  return pipeNow<GValue, GFunctions, GUnaryFunction>(value, fns);
}


// export function pipeNow<GValue, GFunctions extends PipeConstraint<GFunctions, GValue, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
//   value: PipeFirstArgRaw<GFunctions, GUnaryFunction>,
//   ...fns: GFunctions
// ): PipeLastReturnRaw<GFunctions, GUnaryFunction> {
//   return pipe<GFunctions, GUnaryFunction>(...fns)(value as never) as PipeLastReturnRaw<GFunctions, GUnaryFunction>;
// }

// export function pipeNow<GFunctions extends PipeConstraint<GFunctions, GUnaryFunction>, GValue extends PipeFirstArg<GFunctions, GUnaryFunction>, GUnaryFunction extends GenericUnaryFunction = GenericUnaryFunction>(
//   value: GValue,
//   ...fns: GFunctions
// ): PipeLastReturnOrValue<GFunctions, GValue, GUnaryFunction> {
//   return pipe<GFunctions, GUnaryFunction>(...fns)(value) as any;
// }

// const fnc = (v: number): number => (v * 2);
// const a = pipe(fnc);
// const b = a(5);
// const c = pipeNow(5);
// const d = pipeNow(5, (v: number) => (v * 2));

// type F0 = () => string;
// type F1 = (a: number) => string;
// type F2 = (a: string) => boolean;
// type F3 = (a: boolean) => bigint;
// type F4 = (a: never) => bigint;

// // const g: (F0 extends F1 ? true : false); // true
//
// const a: FollowsPipeConstraint<[], any> = null as any; // true
// const a: PipeConstraint<[], any> = null as any; // []
// const a: FollowsPipeConstraint<[F0], void> = null as any; // true
// const a: PipeConstraint<[F0], void> = null as any; // [any]
// const a: FollowsPipeConstraint<[F1], number> = null as any; // true
// const a: PipeConstraint<[F1], number> = null as any; // [any]
// const a: FollowsPipeConstraint<[F1], string> = null as any; // false
// const a: PipeConstraint<[F1], string> = null as any; // [invalid]
// const a: FollowsPipeConstraint<[F1, F2], any> = null as any; // true
// const a: PipeConstraint<[F1, F2], any> = null as any; // [any, any]
// const a: FollowsPipeConstraint<[F1, F3], any> = null as any; // false
// const a: PipeConstraint<[F1, F3], any> = null as any; // [any, invalid]
// const a: PipeConstraint<[F1, F3, F0], any> = null as any; // [any, invalid, any]
// const a: FollowsPipeConstraint<[F1, F2, F3], any> = null as any; // true
// const a: PipeConstraint<[F1, F2, F3], any> = null as any; // [any, any, any]
// const a: FollowsPipeConstraint<[F1, F2, F1], any> = null as any; // false
// const a: PipeConstraint<[F1, F2, F1], any> = null as any; // [any, any, invalid]
// const a: FollowsPipeConstraint<F1[], any> = null as any; // false
// const a: PipeConstraint<F1[], any> = null as any; // never[]
//
// const a: PipeLastReturn<[F1, F2, F3]> = null as any; // bigint
// const a: PipeLastReturn<[]> = null as any; // never
//
// const a: PipeFirstArg<[F1, F2, F3]> = null as any; // number
// const a: PipeFirstArg<[F0]> = null as any; // number
// const a: PipeFirstArg<[]> = null as any; // never

/*----*/

// https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983

export function compose(...fns: GenericUnaryFunction[]) {
  return (firstArg: any): any => {
    return fns.reduceRight((value: any, fnc: GenericUnaryFunction) => fnc(value), firstArg);
  };
}



