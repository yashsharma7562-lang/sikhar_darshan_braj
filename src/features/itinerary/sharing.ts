import "server-only";
import { createHash, randomBytes } from "node:crypto";
export function createShareSecret() {
  const token = randomBytes(32).toString("base64url");
  return { token, tokenHash: hashShareToken(token) };
}
export function hashShareToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
