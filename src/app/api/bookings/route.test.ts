import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("@/features/auth/session", () => ({ getCustomerSession: vi.fn() }));
import { getCustomerSession } from "@/features/auth/session";
import { POST } from "./route";
const mockedSession = vi.mocked(getCustomerSession);
describe("booking creation", () => {
  beforeEach(() => mockedSession.mockResolvedValue(null));
  it("requires authentication before inventory", async () => {
    const response = await POST(
      new Request("http://localhost/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      }),
    );
    expect(response.status).toBe(401);
  });
});
