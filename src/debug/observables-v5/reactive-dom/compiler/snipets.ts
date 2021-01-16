import { ICompilerReturn, IInjectLines, ILines } from './compiler-interface';

export function indentLines(
  lines: ILines,
  indent: string = '  ',
  copy: boolean = false,
): ILines {
  if (copy) {
    return lines.map((line: string) => (indent + line));
  } else {
    for (let i = 0, l = lines.length; i < l; i++) {
      lines[i] = indent + lines[i];
    }
    return lines;
  }
}

export function scopeLines(
  lines: ILines,
  copy: boolean = false,
): ILines {
  if (copy) {
    return ['{', ...indentLines(lines, void 0, true), '}'];
  } else {
    indentLines(lines);
    lines.unshift('{');
    lines.push('}');
    return lines;
  }
}


export function nullIfEmptyLines(
  lines: ILines,
): ILines | null {
  return (lines.length === 0)
    ? null
    : lines;
}


export function optionalLines(
  lines: ILines | null,
): ILines {
  return (lines === null)
    ? []
    : lines;
}



// export function mergeCompilerReturnWithLines(
//   result: ICompilerReturn,
//   lines: ILines,
// ): ILines {
//   if (result === null) {
//     return lines;
//   } else if (isLines(result)) {
//     return [
//       ...lines,
//       ...result,
//     ];
//   } else {
//     return result(lines);
//   }
// }
//
// export function isLines(
//   value: any,
// ): value is ILines {
//   return Array.isArray(value);
// }
//
// export function isInjectLines(
//   value: any,
// ): value is IInjectLines {
//   return (typeof value === 'function');
// }





