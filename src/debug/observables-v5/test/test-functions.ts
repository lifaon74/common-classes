import { log, TERMINAL_CYAN, TERMINAL_GREEN, TERMINAL_MAGENTA, TERMINAL_RED, TERMINAL_YELLOW } from './log';


export function logTestSucceed(name: string): void {
  log([
    ['success: ', TERMINAL_GREEN],
    [name, TERMINAL_YELLOW],
  ]);
}

export function logTestFailed(name: string): void {
  log([
    ['failed: ', TERMINAL_RED],
    [name, TERMINAL_YELLOW],
  ]);
}

export function logAllTestsSucceed(): void {
  log([
    ['all tests passed with success', TERMINAL_CYAN],
  ]);
}

export function logSomeTestsFailed(error: any): void {
  log([
    ['some tests failed', TERMINAL_MAGENTA],
  ]);
  console.log(error);
}



export function runTest(name: string, callback: () => (Promise<void> | void)): Promise<void> {
  // process.stdout.write('\x1b[36m');
  // process.stdout.write('running: ');
  // process.stdout.write('\x1b[33m');
  // process.stdout.write(name);
  // process.stdout.write('\x1b[0m');
  // process.stdout.write('\n');

  return new Promise<void>(resolve => resolve(callback()))
    .then(
      () => {
        logTestSucceed(name);
      },
      (error: any) => {
        logTestFailed(name);
        throw error;
      }
    );
}

export function runTests(callback: () => (Promise<void> | void)): Promise<void> {
  return new Promise<void>(resolve => resolve(callback()))
    .then(
      () => {
        logAllTestsSucceed();
      },
      (error: any) => {
        logSomeTestsFailed(error);
      }
    );
}


