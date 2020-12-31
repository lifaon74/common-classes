export type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>

export type AllTuplesRightToLeft<GTuple extends any[]> =
  GTuple extends []
    ? []
    : (
      GTuple extends [any, ...infer GRest]
        ? (GTuple | AllTuplesRightToLeft<GRest>)
        : never
      );

export type ReverseTuple<GTuple extends any[]> =
  GTuple extends []
    ? []
    : (
      GTuple extends [infer GFirst, ...infer GRest]
        ? [...ReverseTuple<GRest>, GFirst]
        : never
      );

// type AllTuplesRightToLeft<GTuple extends any[]> =
//   any[] extends GTuple
//     ? never
//     : (
//       GTuple extends  [any, ...infer GRest]
//         ? (GTuple | AllTuplesRightToLeft<GRest>)
//         : never
//       );


// const a: AllTuplesRightToLeft<[number, string, boolean]> = null as any;
// const a: AllTuplesRightToLeft<any[]> = null as any;
// const a: AllTuplesRightToLeft<[]> = null as any;

// const a: ReverseTuple<AllTuplesRightToLeft<[number, string, boolean]>> = null as any;


export type AllTuplesLeftToRight<GTuple extends any[]> =
  any[] extends GTuple
    ? never
    : (
      GTuple extends [...infer GRest, any]
        ? (GTuple | AllTuplesLeftToRight<GRest>)
        : never
      );

// type AllTuplesLeftToRight<GTuple extends any[]> =
//   GTuple extends []
//     ? []
//     : (
//       any[] extends GTuple
//         ? never
//         : (
//           GTuple extends [...infer GRest, any]
//             ? (GTuple | AllTuplesLeftToRight<GRest>)
//             : never
//         )
//     );

// const a: AllTuplesLeftToRight<[number, string, boolean]> = null as any;
// const a: AllTuplesLeftToRight<any[]> = null as any;
// const a: AllTuplesLeftToRight<[]> = null as any;


// const a: (any[] extends [1, 2] ? true : false) = null as any;
// const a: ([1, 2] extends any[] ? true : false) = null as any;
