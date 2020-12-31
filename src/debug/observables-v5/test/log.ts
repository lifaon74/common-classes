
// https://gist.github.com/abritinthebay/d80eb99b2726c83feb0d97eab95206c4

export const STD_OUT_RESET = '\x1b[0m';

export const STD_OUT_BLACK = '\x1b[30m';
export const STD_OUT_RED = '\x1b[31m';
export const STD_OUT_GREEN = '\x1b[32m';
export const STD_OUT_YELLOW = '\x1b[33m';
export const STD_OUT_MAGENTA = '\x1b[35m';
export const STD_OUT_CYAN = '\x1b[36m';
export const STD_OUT_WHITE = '\x1b[37m';

export const CONSOLE_RED = 'color: red';
export const CONSOLE_GREEN = 'color: green';
export const CONSOLE_YELLOW = 'color: #efaf00';
export const CONSOLE_MAGENTA = 'color: #9a00b8';
export const CONSOLE_CYAN = 'color: #00a8b8';

export type ITextAndColor = [text: string, color?: ITerminalColor];

export interface ITerminalColor {
  stdout: string;
  console: string;
}


export const TERMINAL_RED: ITerminalColor = {
  stdout: STD_OUT_RED,
  console: CONSOLE_RED,
};

export const TERMINAL_GREEN: ITerminalColor = {
  stdout: STD_OUT_GREEN,
  console: CONSOLE_GREEN,
};

export const TERMINAL_YELLOW: ITerminalColor = {
  stdout: STD_OUT_YELLOW,
  console: CONSOLE_YELLOW,
};

export const TERMINAL_MAGENTA: ITerminalColor = {
  stdout: STD_OUT_MAGENTA,
  console: CONSOLE_MAGENTA,
};

export const TERMINAL_CYAN: ITerminalColor = {
  stdout: STD_OUT_CYAN,
  console: CONSOLE_CYAN,
};


export function log(values: ITextAndColor[]): void {
  if (globalThis?.process?.stdout) {
    for (let i = 0, l = values.length; i < l; i++) {
      const [text, color] = values[i];
      process.stdout.write((color === void 0) ? STD_OUT_RESET : color.stdout);
      process.stdout.write(text);
    }
    process.stdout.write(STD_OUT_RESET);
    process.stdout.write('\n');
  } else {
    let str: string = '';
    let styles: string[] = [];
    for (let i = 0, l = values.length; i < l; i++) {
      const [text, color] = values[i];
      if (color === void 0) {
        str += text;
      } else {
        str += `%c${ text }`;
        styles.push(color.console);
      }
    }
    console.log(str, ...styles);
  }
}
