import { ICompilerReturn } from './compiler-interface';

export function indentLines(
  lines: string[],
  indent: string = '  ',
  copy: boolean = false,
): string[] {
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
  lines: string[],
  copy: boolean = false,
): string[] {
  if (copy) {
    return ['{', ...indentLines(lines, void 0, true), '}'];
  } else {
    indentLines(lines);
    lines.unshift('{');
    lines.push('}');
    return lines;
  }
}

export function optionalLines(
  lines: ICompilerReturn,
  operation: (lines: string[]) => string[] = _ => _,
): string[] {
  return (lines === null)
    ? []
    : operation(lines);
}


export function nullIfEmptyLines(
  lines: string[],
  operation: (lines: string[]) => string[] = _ => _,
): ICompilerReturn {
  return (lines.length === 0)
    ? null
    : operation(lines);
}
