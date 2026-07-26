import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { calculateCommission, reconcilePayment } from "./finance";
import { verifyCheckoutSignature, verifyWebhookSignature } from "./signatures";
describe("payment signatures", () => {
  it("verifies checkout and rejects changed data", () => {
    const secret = "test-secret";
    const signature = createHmac("sha256", secret)
      .update("order_1|pay_1")
      .digest("hex");
    expect(
      verifyCheckoutSignature({
        orderId: "order_1",
        paymentId: "pay_1",
        signature,
        secret,
      }),
    ).toBe(true);
    expect(
      verifyCheckoutSignature({
        orderId: "order_1",
        paymentId: "pay_2",
        signature,
        secret,
      }),
    ).toBe(false);
  });
  it("verifies the raw webhook body", () => {
    const body = "{\id\:\evt_1\}";
    const secret = "webhook-secret";
    const signature = createHmac("sha256", secret).update(body).digest("hex");
    expect(verifyWebhookSignature({ body, signature, secret })).toBe(true);
  });
});
describe("finance", () => {
  it("calculates commission and tax in minor units", () => {
    expect(
      calculateCommission({
        bookingId: "b1",
        grossMinor: 100_000,
        commissionRateBps: 1000,
        taxRateBps: 1800,
      }),
    ).toMatchObject({
      commissionMinor: 10_000,
      taxMinor: 1_800,
      vendorNetMinor: 88_200,
    });
  });
  it("flags reconciliation mismatches", () => {
    expect(
      reconcilePayment({
        providerPaymentId: "p1",
        providerAmountMinor: 100,
        internalPaymentId: "i1",
        internalAmountMinor: 99,
      }).state,
    ).toBe("amount-mismatch");
  });
});
