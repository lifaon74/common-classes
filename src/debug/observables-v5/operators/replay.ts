// https://indepth.dev/posts/1248/fastest-way-to-cache-for-lazy-developers-angular-with-rxjs

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous values
 */
// export function replayOperator<GValue>(
//   length: number = Number.POSITIVE_INFINITY,
// ): IOperatorFunction<GValue, GValue> {
//   const values: GValue[] = [];
//   return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
//     return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//       let running: boolean = false;
//       const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
//         if (values.length === length) {
//           values.shift();
//           values.push();
//         }
//         for (let i = 0, l = values.length; (i < l) && running; i++) {
//           emit(values[i]);
//         }
//       });
//       let previousValue: GValue;
//       return (): void => {
//         running = false;
//         unsubscribe();
//       };
//     };
//   };
// }

// export function replayOperator<GValue>(
//   length: number,
// ): IOperatorFunction<GValue, GValue> {
//   return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
//
//     let start: number = 0;
//     let end: number = 0;
//     const values: GValue[] = Array.from({ length });
//
//     return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//       let running: boolean = false;
//       const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
//         const _end: number = (end + 1) % length;
//         // if (values.length === length) {
//         //   values.shift();
//         //   values.push();
//         // }
//         if (end < start) {
//           for (let i = start; (i < length) && running; i++) {
//             emit(values[i]);
//           }
//           for (let i = 0; (i < end) && running; i++) {
//             emit(values[i]);
//           }
//         } else {
//           for (let i = start; (i < end) && running; i++) {
//             emit(values[i]);
//           }
//         }
//       });
//       return (): void => {
//         running = false;
//         unsubscribe();
//       };
//     };
//   };
// }
