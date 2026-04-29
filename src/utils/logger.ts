const isDev = import.meta.env.DEV;

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (isDev) console.info(`[INFO] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    if (isDev) console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error); // Always log errors
  },
  perf: (message: string, timeInMs: number) => {
    if (isDev) console.log(`[PERF] ${message}: ${timeInMs.toFixed(2)}ms`);
  }
};
