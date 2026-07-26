import { describe, expect, it } from "vitest";
import { POST } from "./route";
describe("session route", () => {
  it("rejects malformed credentials", async () => {
    const response = await POST(
      new Request("http://localhost/api/auth/session", {
        method: "POST",
        body: JSON.stringify({ idToken: "short" }),
      }),
    );
    expect(response.status).toBe(400);
  });
});
