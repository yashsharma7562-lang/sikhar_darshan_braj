import "server-only";
export type SafeErrorReport = {
  name: string;
  digest: string | null;
  requestId: string;
  route: string;
};
export interface ErrorReporter {
  capture(report: SafeErrorReport): Promise<void>;
}
class ConsoleErrorReporter implements ErrorReporter {
  async capture(report: SafeErrorReport): Promise<void> {
    console.error("Server operation failed", report);
  }
}
export const errorReporter: ErrorReporter = new ConsoleErrorReporter();
export function createSafeErrorReport(
  error: unknown,
  requestId: string,
  route: string,
): SafeErrorReport {
  if (error instanceof Error)
    return {
      name: error.name,
      digest:
        "digest" in error && typeof error.digest === "string"
          ? error.digest
          : null,
      requestId,
      route,
    };
  return { name: "UnknownError", digest: null, requestId, route };
}
