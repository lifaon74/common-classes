
export type TUndoTimer = () => void;

export function createInterval(
  callback: () => void,
  interval: number,
): TUndoTimer {
  const timer = setInterval(callback, interval);
  return () => {
    clearInterval(timer);
  };
}

export function createTimeout(
  callback: () => void,
  timeout: number,
): TUndoTimer {
  const timer = setTimeout(callback, timeout);
  return () => {
    clearTimeout(timer);
  };
}
