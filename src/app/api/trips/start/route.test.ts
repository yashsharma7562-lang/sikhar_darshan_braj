import { describe, expect, it } from "vitest";
import { POST } from "./route";
describe("trip start API", () => {
  it("rejects malformed OTP values", async () => {
    const response = await POST(
      new Request("http://localhost/api/trips/start", {
        method: "POST",
        body: JSON.stringify({ tripId: "trip-1", otp: "123" }),
      }),
    );
    expect(response.status).toBe(400);
  });
  it("requires authenticated trip ownership", async () => {
    const response = await POST(
      new Request("http://localhost/api/trips/start", {
        method: "POST",
        body: JSON.stringify({ tripId: "trip-1", otp: "123456" }),
      }),
    );
    expect(response.status).toBe(401);
  });
});
