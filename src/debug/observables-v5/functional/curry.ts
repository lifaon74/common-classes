import { AllTuplesLeftToRight, AllTuplesRightToLeft, SameLength } from './shared-types';
import { TGenericFunction } from '@lifaon/traits';

export type CurrySingleReturn<GFunction extends TGenericFunction> =
  GFunction extends ((...args: infer GArs) => infer GReturn)
    ? (
      GArs extends [infer GFirst, ...infer GRest]
        ? (arg: GFirst) => CurrySingleReturn<(...args: GRest) => GReturn>
        : never
      )
    : never;

export type CurryRightOneByOneReturn<GFunction extends TGenericFunction> =
  GFunction extends ((...args: infer GArs) => infer GReturn)
    ? (
      GArs extends [...infer GRest, infer GLast]
        ? (arg: GLast) => CurrySingleReturn<(...args: GRest) => GReturn>
        : never
      )
    : never;

// type Curried<A extends any[], R> =
//   <P extends Partial<A>>(...args: P) => P extends A ? R :
//     A extends [...SameLength<P>, ...infer S] ? S extends any[] ? Curried<S, R>
//       : never : never;
//

export type CurryReturn<GFunction extends TGenericFunction> =
  GFunction extends ((...args: infer GArs) => infer GReturn)
    ? (
      <GSubArgs extends AllTuplesLeftToRight<GArs>>(...args: GSubArgs) => (
        GSubArgs extends GArs
          ? GReturn
          : (
            GArs extends [...SameLength<GSubArgs>, ...infer GRest]
              ? CurryReturn<(...args: GRest) => GReturn>
              : never
            )
        )
      )
    : never;


export type CurryRightReturn<GFunction extends TGenericFunction> =
  GFunction extends ((...args: infer GArs) => infer GReturn)
    ? (
      <GSubArgs extends AllTuplesRightToLeft<GArs>>(...args: GSubArgs) => (
        GSubArgs extends GArs
          ? GReturn
          : (
            GArs extends [...infer GRest, ...SameLength<GSubArgs>]
              ? CurryRightReturn<(...args: GRest) => GReturn>
              : never
            )
        )
      )
    : never;

// type F0 = () => string;
// type F1 = (a: number, b: string, c: boolean, d: bigint) => symbol;

// const a: CurryReturn<F1> = null as any; // true
// // const b = a(1)('a', true)(BigInt(2))
// const b = a(1)('a', true)(BigInt(2))
// const b = a(1)('a', true)(BigInt(2), 'h')
// //
// const c: CurryRightReturn<F1> = null as any; // true
// const d = c(BigInt(2))('a', true)(1)
// const d = c(BigInt(2))('a', true)(1)
// // // const d = c(BigInt(2))(true, 'a')(1)

export function curry<GFunction extends TGenericFunction>(fnc: GFunction): CurryReturn<GFunction> {
  return function curried(...args: any[]) {
    return (args.length >= fnc.length)
      ? fnc(...args)
      : (...newArgs: any[]) => curried(...args, ...newArgs);
  } as any;
}

export function curryRight<GFunction extends TGenericFunction>(fnc: GFunction): CurryRightReturn<GFunction> {
  return function curried(...args: any[]) {
    return (args.length >= fnc.length)
      ? fnc(...args)
      : (...newArgs: any[]) => curried(...newArgs, ...args);
  } as any;
}

export function curryRightOneByOne<GFunction extends TGenericFunction>(fnc: GFunction): CurryRightOneByOneReturn<GFunction> {
  return curryRight(fnc) as any;
}


// // https://stackoverflow.com/questions/63903982/how-to-write-curry-and-compose-in-typescript-4
// type Curried<A extends any[], R> =
//   <P extends Partial<A>>(...args: P) => P extends A ? R :
//     A extends [...SameLength<P>, ...infer S] ? S extends any[] ? Curried<S, R>
//       : never : never;
//
// type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>
//
// function curryOld<A extends any[], R>(fn: (...args: A) => R): Curried<A, R> {
//   return (...args: any[]): any =>
//     args.length >= fn.length ? fn(...args as any) : curryOld((fn as any).bind(undefined, ...args));
// }
//


