const requestIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export type MutationSecurityResult =
  | { allowed: true }
  | { allowed: false; status: 400 | 403 | 413 | 415; message: string };
export function safeRequestId(value: string | null): string {
  return value && requestIdPattern.test(value) ? value : crypto.randomUUID();
}
export function validateApiMutation(
  method: string,
  contentType: string | null,
  contentLength: string | null,
  origin: string | null,
  requestOrigin: string,
  configuredAppOrigin: string | null,
): MutationSecurityResult {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(method))
    return { allowed: true };
  const length = contentLength ? Number(contentLength) : 0;
  if (!Number.isFinite(length) || length < 0)
    return { allowed: false, status: 400, message: "Invalid content length." };
  if (length > 1_048_576)
    return {
      allowed: false,
      status: 413,
      message: "Request body is too large.",
    };
  if (
    method !== "DELETE" &&
    !contentType?.toLowerCase().startsWith("application/json")
  )
    return {
      allowed: false,
      status: 415,
      message: "JSON content type is required.",
    };
  if (origin) {
    const allowedOrigins = new Set(
      [requestOrigin, configuredAppOrigin].filter(Boolean),
    );
    let parsedOrigin: string;
    try {
      parsedOrigin = new URL(origin).origin;
    } catch {
      return {
        allowed: false,
        status: 403,
        message: "Request origin is invalid.",
      };
    }
    if (!allowedOrigins.has(parsedOrigin))
      return {
        allowed: false,
        status: 403,
        message: "Request origin is not allowed.",
      };
  }
  return { allowed: true };
}
export interface DistributedRateLimiter {
  consume(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<{
    allowed: boolean;
    remaining: number;
    retryAfterSeconds: number;
  }>;
}
