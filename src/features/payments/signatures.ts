import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
function safeMatch(expected: string, received: string) {
  const left = Buffer.from(expected, "utf8");
  const right = Buffer.from(received, "utf8");
  return left.length === right.length && timingSafeEqual(left, right);
}
export function verifyCheckoutSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
  secret: string;
}) {
  const expected = createHmac("sha256", input.secret)
    .update(input.orderId + "|" + input.paymentId)
    .digest("hex");
  return safeMatch(expected, input.signature);
}
export function verifyWebhookSignature(input: {
  body: string;
  signature: string;
  secret: string;
}) {
  const expected = createHmac("sha256", input.secret)
    .update(input.body)
    .digest("hex");
  return safeMatch(expected, input.signature);
}
